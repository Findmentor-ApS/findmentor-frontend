import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class ProfileSidebarComponent implements OnInit {
  type: string;
  user: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    this.route.data.subscribe((data: { user: any }) => {
      this.user = data.user;
      console.log(this.user);
    });
  }

  profileIsCompleted() {
    // List of keys to have values
    const keysToHaveValues = ['first_name', 'last_name', 'email', 'phone', 'street', 'street_no', 'zip_code', 'city', 'education', 'gender', 'description'];

    // Iterate through the keys in userData
    for (const key in this.user) {
      // if the key is in keysToHaveValues, check if the value is null, undefined, or empty
      if (keysToHaveValues.includes(key) && (this.user[key] === null || this.user[key] === undefined || this.user[key] === '')) {
        return false;
      }
    }
    // If all required fields have values, return true
    return true;
  }

}
