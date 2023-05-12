import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { locationsType } from 'src/app/general/types';
import { ProfileService } from 'src/app/services/profile.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-edit-locations',
  templateUrl: './edit-locations.component.html',
  styleUrls: ['./edit-locations.component.css']
})
export class EditLocationsComponent {
  selectedLocationType: number[] = [];
  success = false;
  errorMessage = '';
  locationsType = locationsType;

constructor(private route: ActivatedRoute, private profileService: ProfileService, private userDataService: UserDataService) { }

ngOnInit(): void {
  const user = this.userDataService.getCurrentUser();
  this.selectedLocationType = user.locations.map((con) => parseInt(con.location_type));
}

updateLocation() {
  if (!this.selectedLocationType || this.selectedLocationType.length === 0) {
    this.errorMessage = 'Du skal vælge mindst en lokation!';
    return;
  }
  
  const userData = {
    typeLocations: this.selectedLocationType
  };

  this.profileService.updateProfileLocations(userData).subscribe(
    {
      next: (res) => {
        this.success = true;
        this.errorMessage = '';
        const user = this.userDataService.getCurrentUser();
        user.locations =  this.selectedLocationType.map((type) => {
          return { location_type: type.toString() };
        });
        this.userDataService.setUser(user);
      },
      error: (err) => {
        this.success = false;
        let errorMessage = 'Der er opstået en fejl!';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
          console.log(err.error.message);
        }
        this.errorMessage = errorMessage; // Update errorMessage here
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    }
  );
}

}
