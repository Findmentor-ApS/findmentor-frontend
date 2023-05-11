import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.css']
})
export class EditSettingComponent {
  type: string;
  user: any;
  errorMessage: string = '';
  success: boolean = false;
  is_available= false;
  userData: any;
  constructor(private route: ActivatedRoute, private profileService: ProfileService,
    private userDataService: UserDataService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    const user = this.userDataService.getCurrentUser();
    this.user = user;
    if(this.user.is_available == '1') this.is_available = true
    else this.is_available = false;
  }

  onCheckboxChange(){
    this.is_available = !this.is_available
  }

  profileIsCompleted() {
    // List of keys to have values
    const keysToHaveValues = ['first_name', 'last_name', 'email', 'phone', 'street',
    'street_no', 'zip_code', 'city', 'education', 'gender', 'description',
    'experinces','profile_picture','languages','contacts'];

    // Iterate through the keys in userData
    for (const key in this.user) {
      
      // if the key is in keysToHaveValues, check if the value is null, undefined, or empty
      if (keysToHaveValues.includes(key) && (this.user[key] === null || this.user[key] === undefined || this.user[key] === '' || this.user[key].length === 0)) {
        return false;
      }
    }
    // If all required fields have values, return true
    return true;
  }

  updateSettings(){
    this.userData  = {
      is_available: this.is_available
    };
    this.profileService.updateSettings(this.userData).subscribe(
      {
        next: (res) => {
          this.success = true;
          this.errorMessage = '';
          
          const user = this.userDataService.getCurrentUser();
          user.is_available = this.is_available;
          this.userDataService.setUser(user);
        },
        error: (error) => {
          this.success = false;
          this.errorMessage = error.message
        },
        complete: () => console.log('complete')
      }
    )
  }
}
