import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit {
  constructor(private messagingService: MessagingService, private userDataService: UserDataService) { }

  ngOnInit() {
    if (this.userDataService.getCurrentUser() != null) {
      const user = this.userDataService.getCurrentUser();
      this.messagingService.subscribeToContactsChannelNotification(user.id, localStorage.getItem('type'));

    }
    else {
      console.log('no user');
    }
  }

}
