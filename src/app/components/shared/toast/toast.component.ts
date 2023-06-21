import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  showMessage: boolean = false;
  lastMessage: any = null;

  constructor(private messagingService: MessagingService, private userDataService: UserDataService, private router: Router) {
    this.messagingService.messageReceived$.subscribe(contacts => {

      
      // console.log('contacts: ', contacts['updated_contacts']);
      this.lastMessage = contacts['updated_contacts'][0];

      if(this.lastMessage['is_receiver'] == 1 && this.isNotProfileMessagesRoute()){
        this.showMessage = true;
      }
      // Optionally, hide the message after a few seconds
      setTimeout(() => {
        this.showMessage = false;
      }, 5000);
    });
  }

  // set showmessage to false
  hideMessage() {
    this.showMessage = false;
  }

  // Redirect to message page with the contact id and type
  goToMessage() {
    this.router.navigate(['profile', 'messages', this.lastMessage['contact_id'], this.lastMessage['contact_type']]);
  }

  isNotProfileMessagesRoute(): boolean {
    const currentRoute = this.router.url;
    const pattern = /^\/profile\/messages\/[\w-]+\/[\w-]+$/;
    return !pattern.test(currentRoute);
  }
}
