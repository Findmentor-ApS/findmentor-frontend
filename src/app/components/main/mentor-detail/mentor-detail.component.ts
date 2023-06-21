import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { audiencesType, experienceType, languagesType, locationsType } from 'src/app/general/types';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-mentor-detail',
  templateUrl: './mentor-detail.component.html',
  styleUrls: ['./mentor-detail.component.css']
})
export class MentorDetailComponent implements OnInit {


  // @ViewChild('modalBooking') modalbooking: ElementRef<any>;
  isBookingModalOpen = false;
  isCallModalOpen = false;
  isPhoneModalOpen = false;
  @ViewChild('modalCall') modalCall: ElementRef<any>;
  @ViewChild('modalPhone') modalPhone: ElementRef<any>;

  mentor: any;

  experienceTypeMap: {[key: number]: string} = {};
  type = '';
  success = false;
  errorMessage = '';
  experienceType = experienceType;
  selectedTypeExperience: any;
  showToast= false


  constructor(private route: ActivatedRoute,private fb: FormBuilder, 
    private mentorService: MentorService,@Inject('ASSET_PATH') public assetPath: string,  private router: Router) { }

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    experienceType.forEach(type => {
      this.experienceTypeMap[type.id] = type.name;
    });

    this.route.data.subscribe((data: { mentor: any }) => {
      this.mentor = data.mentor;
  
      this.mentor.experiences = data.mentor.experiences.map((exp) => parseInt(exp.experience_type));
    });
    this.profileVisited()
    // this.modalbooking.nativeElement.setAttribute('aria-hidden', 'true');
  }

  // This method opens the booking modal
  openBookingModal() {
    this.isBookingModalOpen = true;
  }

  // This method closes the booking modal
  closeBookingModal() {
    this.isBookingModalOpen = false;
  }

  // This method opens the booking modal
  openCallModal() {
    this.isCallModalOpen = true;
  }

  // This method closes the booking modal
  closeCallModal() {
    this.isCallModalOpen = false;
  }

  openPhoneModal(){
    this.isPhoneModalOpen = true;
  }

  closePhoneModal() {
    this.isPhoneModalOpen = false;
  }


  profileVisited() {
    const userData = {
      mentor_id: this.mentor.id,
    }
    this.mentorService.profileVisited(userData).subscribe(
      {
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('complete')
      }
    )
  }

  getLanguageName(id: number): string {
    const language = languagesType.find(l => l.id == id);
    return language ? language.name : '';
  }


  getAudienceName(id: number): string {
    const audience = audiencesType.find(a => a.id == id);
    return audience ? audience.name : '';
  }

  getLocationName(id: number): string {
    const location = locationsType.find(l => l.id == id);
    return location ? location.name : '';
  }

  hasContactType(type: number): boolean {
    return this.mentor.contacts.some(contact => contact.contact_type == type);
  }

  // redirect to a message page with mentor 
  goToMessage() {
    localStorage.setItem('first_name', this.mentor.first_name);
    localStorage.setItem('last_name', this.mentor.last_name);
    this.router.navigate(['profile', 'messages', this.mentor.id , 'mentor']);
  }

}
