import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { languagesType } from 'src/app/general/types';
import { ProfileService } from 'src/app/services/profile.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-edit-languages',
  templateUrl: './edit-languages.component.html',
  styleUrls: ['./edit-languages.component.css']
})
export class EditLanguagesComponent {
  selectedLanguageType: number[] = [];
  success = false;
  errorMessage = '';
  languagesType = languagesType;

constructor(private route: ActivatedRoute, private profileService: ProfileService, private userDataService: UserDataService) { }

ngOnInit(): void {
  const user = this.userDataService.getCurrentUser();
  this.selectedLanguageType = user.languages.map((con) => parseInt(con.language_type));
}

updateLanguage() {
  if (!this.selectedLanguageType || this.selectedLanguageType.length === 0) {
    this.errorMessage = 'Du skal vælge mindst et sprog!';
    return;
  }
  
  const userData = {
    typeLanguages: this.selectedLanguageType
  };

  this.profileService.updateProfileLanguages(userData).subscribe(
    {
      next: (res) => {
        this.success = true;
        this.errorMessage = '';
        const user = this.userDataService.getCurrentUser();
        user.languages =  this.selectedLanguageType.map((type) => {
          return { language_type: type.toString() };
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
