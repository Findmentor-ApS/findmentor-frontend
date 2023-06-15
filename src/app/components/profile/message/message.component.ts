import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  // MessageComponent

  public messages: any = [];
  public contacts: any = [];
  public messageText: string = '';
  public selectedContact: any = null;
  user: any = null;
  currentChannel: any;

  constructor(private messagingService: MessagingService, private userDataService: UserDataService) { }

  ngOnInit(): void {
      this.messagingService.getContacts().subscribe((contacts: any) => {
          this.contacts = contacts;
      });
      this.user = this.userDataService.getCurrentUser();
  }

  loadMessagesForContact(contact: any): void {
      this.selectedContact = contact;

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
      });

      // Load messages for the selected contact
      this.messagingService.getMessagesForContact(contact.contact_id, contact.contact_type).subscribe((messages: any) => {
          this.messages = messages.reverse();
      });
  }

  sendMessage(): void {
      const userData = {
          content: this.messageText,
          receiver_id: this.selectedContact.contact_id,
          receiver_type: this.selectedContact.contact_type,
          sender_id: this.user.id,
          sender_type: localStorage.getItem('type')
      }

      if (this.messageText.trim() !== '') {
          this.messagingService.sendMessage(userData).subscribe(() => {

              // const contact = this.contacts.find(c => c.contact_id === this.selectedContact.contact_id && c.contact_type === this.selectedContact.contact_type);
              // if (contact) {
              //     contact.last_message_content = this.messageText;
              // }

              this.messageText = '';

          });
      }
  }

}
