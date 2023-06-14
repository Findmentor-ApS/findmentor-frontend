import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public messages: any;
  public messageText: string = '';

  constructor(private messagingService: MessagingService) { }

  ngOnInit(): void {

    this.messagingService.getMessages().subscribe((messages: any) => {
      console.log(messages);
      // console.log(messages);
      this.messages = messages;
    });


    const channel = this.messagingService.getChannel();
    channel.bind('new-message', (message: any) => {
      console.log('Received message: ', message); // Log received messages
      console.log(this.messages);
      this.messages.push(message);
      console.log(this.messages);
    });
  }

  sendMessage(): void {
    const userData = {
      content: this.messageText,
      receiver_id: 101,
      receiver_type: 'commune',
      sender_id: 125,
      sender_type: 'mentor'
    }
    if (this.messageText.trim() !== '') {
      this.messagingService.sendMessage(userData).subscribe(() => {
        this.messageText = '';
      });
    }
  }
}
