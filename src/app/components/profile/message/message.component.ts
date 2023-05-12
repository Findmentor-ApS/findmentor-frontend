import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  selectedUser: { userType: string, id: number };
  chatHistory: any[] = [];
  newMessage: string = '';
  page: number = 0;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // Initialize the selected user here (mentor, commune, or user)
    this.selectedUser = { userType: 'mentor', id: 124 };

    this.loadChatHistory(this.page);
    
  }

  loadChatHistory(page: number) {
    this.messageService.getMessages(this.selectedUser.userType, this.selectedUser.id, page).subscribe((messages: any[]) => {
      const messagesArray = Object.entries(messages).map(([key, value]) => ({
        id: value.id,
        sender_type: value.sender_type,
        sender_id: value.sender_id,
        receiver_type: value.receiver_type,
        receiver_id: value.receiver_id,
        content: value.content,
        created_at: value.created_at,
        info: value.info
      }));
      console.log(messages);
      if (page === 0) {
          this.chatHistory = messagesArray;
        } else {
          this.chatHistory = [...messagesArray, ...this.chatHistory];
        }
      });
    console.log(this.chatHistory);
  }
  

  sendMessage() {
    this.messageService.sendMessage(this.selectedUser.userType, this.selectedUser.id, this.newMessage)
        .subscribe(result => {
            this.newMessage = ''; // clear the message input field
            this.loadChatHistory(0); // load the chat history to display the new message
        });
  }

  onScroll() {
    this.page++;
    this.loadChatHistory(this.page);
  }
}

