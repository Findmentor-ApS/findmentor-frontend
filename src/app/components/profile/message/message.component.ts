import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @ViewChild('messagesContainer', { static: false }) messagesContainer: ElementRef;
  public messages: any = [];
  public contacts: any = [];
  public messageText: string = '';
  public selectedContact: any = null;
  page: number = 0;
  loading: boolean = false;
  isSending: boolean = false;
  user: any = null;
  currentChannel: any;

  constructor(private messagingService: MessagingService, private userDataService: UserDataService,@Inject('ASSET_PATH') public assetPath: string) { }

  ngOnInit(): void {
      this.messagingService.getContacts().subscribe((contacts: any) => {
          this.contacts = contacts;
      });
      this.user = this.userDataService.getCurrentUser();
  }

  loadMessagesForContact(contact: any): void {
      this.selectedContact = contact;
      this.page = 0; // Reset page number
      // Unsubscribe from the previous channel
      if (this.currentChannel) {
          this.currentChannel.unbind('new-message');
          this.messagingService.pusher.unsubscribe(this.currentChannel.name);
      }

      // Subscribe to a new channel
      this.currentChannel = this.messagingService.subscribeToChannel(localStorage.getItem('type'), this.user.id, contact.contact_type, contact.contact_id);
      this.currentChannel.bind('new-message', (message: any) => {
          this.messages.push(message);

          const contact = this.contacts.find(c => c.contact_id === this.selectedContact.contact_id && c.contact_type === this.selectedContact.contact_type);
          if (contact) {
              contact.last_message_content = message.content;
          }
          this.scrollToBottom();
      });

      this.messagingService.getMessagesForContact(contact.contact_id, contact.contact_type).subscribe((messages: any) => {
        this.messages = messages.reverse();
        this.scrollToBottom();
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
        created_at: new Date()
    }

    if (this.messageText.trim() !== '') {
        this.isSending = true;
        this.messagingService.sendMessage(userData).subscribe(() => {

            // const contact = this.contacts.find(c => c.contact_id === this.selectedContact.contact_id && c.contact_type === this.selectedContact.contact_type);
            // if (contact) {
            //     contact.last_message_content = this.messageText;
            // }

            this.isSending = false;
            this.messageText = '';
            this.scrollToBottom();

        });
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    });
  }

  onTextareaKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

}
