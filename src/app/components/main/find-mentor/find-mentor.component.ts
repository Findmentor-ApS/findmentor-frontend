import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-find-mentor',
  templateUrl: './find-mentor.component.html',
  styleUrls: ['./find-mentor.component.css']
})
export class FindMentorComponent implements OnInit {
  selectedGender: Array<number> = [];
  constructor(private router: Router, private httpClient: HttpClient, private mentorService: MentorService) {

  }

  ngOnInit(): void {
    this.selectedGender = [1,2];
  }
  // testing code
  array = [];
  sum = 20;
  throttle = 30;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";
  index = 1;

  // testing code end
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    this.onScrollDown();
  }


  mentorList: any;

  typeFormSelector() {
    console.log("Dropdown selection:", this.selectedTypeForm);
    // this.router.navigate(['/find-mentor'], { queryParams: { Støtteform: this.selectedTypeForm } });
  }
  locationSelector() {
    console.log("Dropdown selection:", this.selectedLocation);
    // this.router.navigate(['/find-mentor'], { queryParams: { VælgRegion: this.selectedLocation } });
  }
  languageSelector() {
    console.log("Dropdown selection:", this.selectedLanguage);
    // this.router.navigate(['/find-mentor'], { queryParams: { Vælgsprog: this.selectedLanguage } });
  }
  genderSelector() {
    console.log("Dropdown selection:", this.selectedGender);
    // this.router.navigate(['/find-mentor'], { queryParams: { mentor: this.selectedGender } });
  }

  resetURL() {
    this.router.navigate(['/find-mentor'])
  }
  // selectedCars = [];
  selectedSearch: any;
  searchArr = [
    { id: 1, name: 'Støttementor' },
    { id: 2, name: 'SocialMentor' },
  ];

  selectedLocationArr = []
  locationArr = [
    { id: 1, name: 'Region Hovedstaden' },
    { id: 2, name: 'Region Sjælland' },
    { id: 3, name: 'Region Midtjylland' },
    { id: 4, name: 'Region Syddanmark' },
  ];


  selectedTypeForm = [];
  typeForm = [
    { id: 1, name: 'Angst' },
    { id: 2, name: 'Depression' },
    { id: 3, name: 'Stress' },
    { id: 4, name: 'Personlig udvikling' },
    { id: 5, name: 'Sorg og tab' },
    { id: 6, name: 'Autisme' },
    { id: 7, name: 'Stofmisbrug' },
  ]

  selectedLocation = []
  emptyLanguage = [];
  filterLocation = [
    { id: 1, name: ' Hovedstaden' },
    { id: 2, name: ' Sjælland' },
    { id: 3, name: ' Midtjylland' },
    { id: 4, name: ' Syddanmark' },
  ];

  selectedLanguage = []
  languages = [
    { id: 1, name: 'Engelsk' },
    { id: 2, name: 'Dansk' }
  ]
  genders = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' }
  ]


  onScrollDown(ev? ) {
    console.log(ev);
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.index = this.index + 1;
      console.log(ev);
    }
  }
  toggleDisabled() {
    const search: any = this.searchArr[1];
    search.disabled = !search.disabled;
  }

  onSearch(): void {
    this.mentorService.searchMentors(this.selectedSearch, this.selectedLocationArr, this.selectedTypeForm, this.selectedLanguage, this.selectedGender)
    .subscribe(mentors => {
      // Do something with the mentors returned from the API
    });
  }

}
