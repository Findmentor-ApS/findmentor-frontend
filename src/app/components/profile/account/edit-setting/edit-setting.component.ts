import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.css']
})
export class EditSettingComponent {
  isAvailable = false;
  type: string;
  user: any;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    this.route.data.subscribe((data: { user: any }) => {
      this.user = data.user;
    });
    this.user.profile_picture = "fasdfa";
    console.log(this.user);
    console.log(this.profileIsCompleted());
  }

  onCheckboxChange(){
    this.isAvailable = !this.isAvailable;
    // console.log(e.target.checked);
  }

  profileIsCompleted() {
    // List of keys to ignore during the check
    const keysToIgnore = ['street_side', 'street_no', 'linkedin'];
  
    // Iterate through the keys in userData
    for (const key in this.user) {
      // If the key is not in the keysToIgnore array and the value is null, undefined, or empty, return false
      if (!keysToIgnore.includes(key) && (this.user[key] === null || this.user[key] === undefined || this.user[key] === '')) {
        return false;
      }
    }
    // If all required fields have values, return true
    return true;
  }
}
