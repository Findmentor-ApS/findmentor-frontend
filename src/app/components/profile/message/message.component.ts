import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public messages: any = [];
  public contacts: any = [];
  public messageText: string = '';
  public selectedContact: any = null;
  private user: any = null;
  constructor(private messagingService: MessagingService, private userDataService: UserDataService) { }

  ngOnInit(): void {
    // Load contacts
    this.messagingService.getContacts().subscribe((contacts: any) => {
      this.contacts = contacts;
      console.log(contacts);
    });
    this.user = this.userDataService.getCurrentUser();
    // Listen for real-time messages
    const channel = this.messagingService.getChannel();
    channel.bind('new-message', (message: any) => {
      // If the message belongs to the currently selected contact, push it to the messages array.
      if (this.selectedContact && (message.sender_id === this.selectedContact.contact_id || message.receiver_id === this.selectedContact.contact_id )) {
        this.messages.push(message);
      }
    });
  }

  loadMessagesForContact(contact: any): void {
    this.selectedContact = contact;

    // Load messages for the selected contact
    // Here, you could filter or query messages based on the selected contact
    // I'm using a simplified example assuming you have a method to get messages by contact.
    console.log(contact.contact_id);
    this.messagingService.getMessagesForContact(contact.contact_id, contact.contact_type).subscribe((messages: any) => {
      console.log(messages);
      this.messages = messages;
    });
  }

  sendMessage(): void {
    console.log(this.user)
    const userData = {
      content: this.messageText,
      receiver_id: this.selectedContact.contact_id,
      receiver_type: this.selectedContact.contact_type,
      sender_id: this.user.id,
      sender_type: localStorage.getItem('type')
    }

    if (this.messageText.trim() !== '') {
      this.messagingService.sendMessage(userData).subscribe(() => {
        this.messageText = '';
      });
    }
  }
}
