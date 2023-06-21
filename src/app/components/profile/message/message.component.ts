import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';
import { UserDataService } from 'src/app/services/user-data.service';

const SCROLL_OFFSET = 10;
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @ViewChild('messagesContainer', { static: false }) messagesContainer: ElementRef;
  public messages: any[] = [];
  public contacts: any[] = [];
  public messageText: string = '';
  public selectedContact: { contact_id: number, contact_type: string, first_name: string, last_name: string } = { contact_id: null, contact_type: null, first_name: null, last_name: null };
  public isSending: boolean = false;
  public user: any = null;
  public loading: boolean = false;
  private currentFocusedContactId: number = null;
  private currentFocusedContactType: string = null;
  private page: number = 0;
  private messageChannel: any = null;
  private initializedId: any = null;
  private initializedType: string = null;

  constructor(private messagingService: MessagingService, private userDataService: UserDataService,
    @Inject('ASSET_PATH') public assetPath: string,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.messagingService.getContacts().subscribe((contacts: any) => {
      this.contacts = contacts;

      if(this.route.snapshot.paramMap.get('id') && this.route.snapshot.paramMap.get('type')){
        this.initializedId = this.route.snapshot.paramMap.get('id');
        this.initializedType = this.route.snapshot.paramMap.get('type');
        this.loadMessagesForContact({ contact_id: this.initializedId, contact_type: this.initializedType });
      }
    });
    this.user = this.userDataService.getCurrentUser();


    // Subscribe to contacts channel
    this.messagingService.subscribeToContactsChannelNotification(this.user.id, localStorage.getItem('type'));
    this.messagingService.messageReceived$.subscribe(data => {
      if (this.selectedContact) {
        this.currentFocusedContactId = this.selectedContact.contact_id;
        this.currentFocusedContactType = this.selectedContact.contact_type;
      }

      // Update the contacts array
      this.contacts = data['updated_contacts'];

      // If there was a previously focused contact, set it as the selected contact
      if (this.currentFocusedContactId) {
        this.selectedContact = this.contacts.find(contact => contact.contact_id === this.currentFocusedContactId && contact.contact_type === this.currentFocusedContactType);
      }
    });
  }

loadMessagesForContact(contact: any): void {
    this.selectedContact = contact;
    console.log(this.selectedContact);
    const con = this.contacts.find(c => c.contact_id === this.selectedContact.contact_id && c.contact_type === this.selectedContact.contact_type);
    if(!con){
      this.selectedContact.first_name = localStorage.getItem('first_name')
      this.selectedContact.last_name = localStorage.getItem('last_name')
      localStorage.removeItem('first_name')
      localStorage.removeItem('last_name')
    } else {
      this.selectedContact.first_name = con.first_name;
      this.selectedContact.last_name = con.last_name;
      con.last_message_seen = true;
    }
    // this.selectedContact.last_message_seen = true;
    this.page = 0; // Reset page number
    // Unsubscribe from the previous channel
    if (this.messageChannel) {
        this.messageChannel.unbind('new-message');
        this.messagingService.pusher.unsubscribe(this.messageChannel.name);
    }

    // Subscribe to messages channel
    this.messageChannel = this.messagingService.subscribeToChatChannel(localStorage.getItem('type'), this.user.id, contact.contact_type, contact.contact_id);
    this.messageChannel.bind('new-message', (message: any) => {
        // push if received message is for the selected contact
        if (message.sender_id == this.selectedContact.contact_id && message.sender_type == this.selectedContact.contact_type) 
        {
          this.messages.push(message);
          
          // call markMessagesAsSeen function from messaging.service.ts
          const userData = {
            receiver_id: this.selectedContact.contact_id,
            receiver_type: this.selectedContact.contact_type,
            sender_id: this.user.id,
            sender_type: localStorage.getItem('type'),
            message_ids: [message.id]
          }
          this.messagingService.markMessagesAsSeen(userData).subscribe((response: any) => {
            // console.log(response);
          });
          
        }
        else this.messageText = '';

        if (con) {
          con.last_message_content = message.content;
        }
        this.scrollToBottom();
    });

    this.messagingService.getMessagesForContact(contact.contact_id, contact.contact_type).subscribe((messages: any) => {
      this.messages = messages.reverse();

          // Only include message IDs where the current user is the receiver
      // get all the id's of the messages that are sent to the current user
      const messageIds = messages.filter(message => message.receiver_id == this.user.id && message.receiver_type == localStorage.getItem('type')).map(message => message.id);
      // const messageIds = messages.filter(message => message.receiver_id == this.user.id && message.receiver_type == localStorage.getItem('type')).map(message => message.id);
      if (messageIds.length > 0) {
        const userData = {
          receiver_id: this.selectedContact.contact_id,
          receiver_type: this.selectedContact.contact_type,
          sender_id: this.user.id,
          sender_type: localStorage.getItem('type'),
          message_ids: messageIds
        }

        // call function the set this.messages to response
        this.messagingService.markMessagesAsSeen(userData).subscribe((response: any) => {
          // console.log(response);
        });
      }


      this.scrollToBottom();
    });

    this.messagingService.pusher.bind('message-seen', (data: any) => {
      console.log(this.messages);
      console.log(data);
      // data has message_ids, and set the message id to seen in this.messages, and update the view
      this.messages.forEach((message: any) => {
        if (data.message_ids.includes(message.id)) {
          message.seen = "1";
        }
      }
      );
      console.log(this.messages);
    });
  }

  onScroll() {
    if (!this.loading) {
      this.loading = true;
      this.page++;
      this.messagingService.getMessagesForContact(this.selectedContact.contact_id, this.selectedContact.contact_type, this.page)
          .subscribe((messages: any) => {
              // Prepend new messages to the start of the array
              this.messages = [...messages, ...this.messages];
              this.loading = false;
          });
    }
  }


  sendMessage(): void {
    if (this.isSending) {
        return;
      }
    const userData = {
        content: this.messageText,
        receiver_id: this.selectedContact.contact_id,
        receiver_type: this.selectedContact.contact_type,
        sender_id: this.user.id,
        sender_type: localStorage.getItem('type'),
        created_at: new Date(),
        seen: false
    }

    // add the sent message to the messages array

    if (this.messageText.trim() !== '') {
        this.isSending = true;
        this.messagingService.sendMessage(userData).subscribe((response: any) => {
            this.messages.push(response);
            this.isSending = false;
            this.scrollToBottom();
        });
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight + SCROLL_OFFSET;
    });
  }

  onTextareaKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

}
