import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { audiencesType } from 'src/app/general/types';
import { ProfileService } from 'src/app/services/profile.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-edit-audiences',
  templateUrl: './edit-audiences.component.html',
  styleUrls: ['./edit-audiences.component.css']
})
export class EditAudiencesComponent {
  selectedAudienceType: number[] = [];
  success = false;
  errorMessage = '';
  audiencesType = audiencesType;

constructor(private route: ActivatedRoute, private profileService: ProfileService, private userDataService: UserDataService) { }

ngOnInit(): void {
  const user = this.userDataService.getCurrentUser();
  this.selectedAudienceType = user.audiences.map((con) => parseInt(con.audience_type));
}

updateAudience() {
  if (!this.selectedAudienceType || this.selectedAudienceType.length === 0) {
    this.errorMessage = 'Du skal vælge mindst en klientgruppe!';
    return;
  }
  
  const userData = {
    typeAudiences: this.selectedAudienceType
  };

  this.profileService.updateProfileAudiences(userData).subscribe(
    {
      next: (res) => {
        this.success = true;
        this.errorMessage = '';
        const user = this.userDataService.getCurrentUser();
        user.audiences =  this.selectedAudienceType.map((type) => {
          return { audience_type: type.toString() };
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
