import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { experienceType } from 'src/app/general/types';
import { ProfileService } from 'src/app/services/profile.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-experience-profile',
  templateUrl: './experience-profile.component.html',
  styleUrls: ['./experience-profile.component.css']
})
export class ExperienceProfileComponent implements OnInit {
  selectedTypeExperience: number[] = [];
  success = false;
  errorMessage = '';
  experienceType = experienceType;

constructor(private route: ActivatedRoute, private profileService: ProfileService, private userDataService: UserDataService) { }

  ngOnInit(): void {
    const user = this.userDataService.getCurrentUser();
    this.selectedTypeExperience = user.experiences.map((con) => parseInt(con.experience_type));
  }

  updateExperience() {
    if (!this.selectedTypeExperience || this.selectedTypeExperience.length === 0) {
      this.errorMessage = 'Du skal vælge mindst en erfaring';
      return;
    }
    
    const userData = {
      typeExperiences: this.selectedTypeExperience
    };
  
    this.profileService.updateProfileExperience(userData).subscribe(
      {
        next: (res) => {
          this.success = true;
          this.errorMessage = '';
          const user = this.userDataService.getCurrentUser();
          user.experiences =  this.selectedTypeExperience.map((type) => {
            return { experience_type: type.toString() };
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
  

  /*updateArray(type: number): void {
    const index = this.selectedTypeExperience.indexOf(type);
    if (index === -1) {
      this.selectedTypeExperience.push(type);
    } else {
      this.selectedTypeExperience.splice(index, 1);
    }
  }*/

}
