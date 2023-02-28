import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  formGroup: FormGroup;

constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  updateExperience() {
    this.profileService.updateProfileExperience(this.selectedTypeExperience).subscribe(
      {
        next: (res) => {
          this.success = true;
          this.errorMessage = '';
          console.log(res);
        },
        error: (err) => {
          this.success = false;
          this.errorMessage = err.error.message;
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        }
      }
    );
  }

  updateArray(type: number): void {
    const index = this.selectedTypeExperience.indexOf(type);
    if (index === -1) {
      this.selectedTypeExperience.push(type);
    } else {
      this.selectedTypeExperience.splice(index, 1);
    }
  }

}
