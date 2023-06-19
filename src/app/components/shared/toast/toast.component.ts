import { Component } from '@angular/core';
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

  constructor(private messagingService: MessagingService, private userDataService: UserDataService) {
    this.messagingService.messageReceived$.subscribe(contacts => {

      
      // console.log('contacts: ', contacts['updated_contacts']);
      this.lastMessage = contacts['updated_contacts'][0];
      console.log(this.lastMessage['is_receiver'])
      if(this.lastMessage['is_receiver'] == 1){
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
}
