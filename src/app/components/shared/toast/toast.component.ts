import { Component } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  showMessage: boolean = false;
  messageContent: string;

  constructor(private messagingService: MessagingService) {
    this.messagingService.messageReceived$.subscribe(message => {
      this.showMessage = true;
      this.messageContent = message;
      
      // Optionally, hide the message after a few seconds
      setTimeout(() => {
        this.showMessage = false;
      }, 5000);
    });
  }
}
