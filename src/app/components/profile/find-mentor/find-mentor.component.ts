import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-find-mentor',
  templateUrl: './find-mentor.component.html',
  styleUrls: ['./find-mentor.component.css']
})
export class FindMentorComponent implements OnInit {
selectedMentorType: number;
selectedLocationArr: number[] = [];
selectedGender: number[] = [];
selectedTypeForm: number[] = [];
selectedLanguage: number[] = [];
selectedContact: number[] = [];
selectedTarget: number[] = [];


mentors: any[] = [];
totalItems: number = 0;
constructor(private router: Router, private mentorService: MentorService) { }

ngOnInit(): void {

}

updateArray(type: number, arrayType: number[]): void {
  const index = arrayType.indexOf(type);
  if (index === -1) {
    arrayType.push(type);
  } else {
    arrayType.splice(index, 1);
  }
}

  resetURL() {
    this.router.navigate(['/find-mentor']);
  }

  searchArr = [
    { id: 1, name: 'Støttementor' },
    { id: 2, name: 'SocialMentor' },
  ];

  locationArr = [
    { id: 1, name: 'Region Hovedstaden' },
    { id: 2, name: 'Region Sjælland' },
    { id: 3, name: 'Region Midtjylland' },
    { id: 4, name: 'Region Syddanmark' },
  ];

  typeForm = [
    { id: 1, name: 'Angst' },
    { id: 2, name: 'Depression' },
    { id: 3, name: 'Stress' },
    { id: 4, name: 'Personlig udvikling' },
    { id: 5, name: 'Sorg og tab' },
    { id: 6, name: 'Autisme' },
    { id: 7, name: 'Stofmisbrug' },
  ];

  languages = [
    { id: 1, name: 'Engelsk' },
    { id: 2, name: 'Dansk' },
    { id: 3, name: 'Arabisk' },
    { id: 4, name: 'Tyrkisk' },
    { id: 5, name: 'Kurdisk' },
    { id: 6, name: 'Farsi' },
    { id: 7, name: 'Somali' },
    { id: 8, name: 'Urdu' },
    { id: 9, name: 'Pashto' },
    { id: 10, name: 'Ukrainsk' },
    { id: 11, name: 'Russisk' },
  ];

  contacts = [
    { id: 1, name: 'Personlig', selected: false, },
    { id: 2, name: 'Telefonisk', selected: false, },
    { id: 3, name: 'Online', selected: false,},
  ]

  index = 1;
  perPage = 10;


  searchMentors() {
    this.totalItems = 0;
    this.mentorService.searchMentors(
      this.selectedMentorType,
      this.selectedLocationArr,
      this.selectedTypeForm,
      this.selectedLanguage,
      this.selectedGender,
      this.selectedContact,
      this.selectedTarget,
      this.index,
      this.perPage
    ).subscribe(mentors => {
      this.mentors = this.mentors.concat(mentors.result);
      this.totalItems = mentors.totalItems;
    });
  }
}