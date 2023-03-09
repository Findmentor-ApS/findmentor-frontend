import { Component, OnInit } from '@angular/core';
import { PusherService } from '../../../services/pusher.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  messages: string[] = [];
  channel: any;
  message: string = '';

  constructor(private pusherService: PusherService) { }

  ngOnInit() {
    this.pusherService.channel.bind('messages', data => {
      this.messages = data.likes ;
    });
  }

  sendMessage(message: string) {
    this.messages.push(message);
    this.pusherService.sendMessage(message);
  }
}
