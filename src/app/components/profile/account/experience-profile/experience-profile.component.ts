import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { experienceType } from 'src/app/general/types';
import { ProfileService } from 'src/app/services/profile.service';

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

constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { user: any }) => {
      this.selectedTypeExperience = data.user.experiences.map((exp) => parseInt(exp.experience_type));
    });
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
          console.log(res);
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
