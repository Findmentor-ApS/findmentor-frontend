import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit {
  isNewMessage: boolean = false;

  constructor(private messagingService: MessagingService, private userDataService: UserDataService) { }

  ngOnInit() {
    if (this.userDataService.getCurrentUser() != null) {
      const user = this.userDataService.getCurrentUser();
      this.messagingService.subscribeToContactsChannelNotification(user.id, localStorage.getItem('type'));
      this.messagingService.messageReceived$.subscribe(message => {
        // set isNewMessage to true for 3 seconds
        this.isNewMessage = true;
        setTimeout(() => {
          this.isNewMessage = false;
        }, 3000);
      });
    }
    else {
      console.log('no user');
    }
  }

}
