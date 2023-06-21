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


  @ViewChild('modalBooking') modalbooking: ElementRef<any>;
  @ViewChild('modalCall') modalCall: ElementRef<any>;
  @ViewChild('modalPhone') modalPhone: ElementRef<any>;

  mentor: any;
  formGroupBooking: FormGroup;
  formGroupCall: FormGroup;
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
      if(this.type == 'commune') {
        this.formGroupBooking = this.fb.group({
          help_text: new FormControl('',[Validators.required]),
          first_name: new FormControl('',[Validators.required]),
          last_name: new FormControl('',[Validators.required]),
          cpr_number: new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]),
          phone: new FormControl<string>('', [Validators.required,Validators.pattern('[- +()0-9]+'),Validators.minLength(8)]),
          street: new FormControl<string>('',[Validators.required]),
          city: new FormControl<string>('',[Validators.required]),
          social_worker: new FormControl<string>('',[Validators.required]),
          ean_nr: new FormControl<string>('',[Validators.required]),
          goal: new FormControl<string>('',[Validators.required]),
          start_date: new FormControl<Date>(new Date(),[Validators.required]),
          end_date: new FormControl<Date>(new Date(),[Validators.required]),
        });  
      }
      else if(this.type == 'user') {
        this.formGroupBooking = this.fb.group({
          help_text: new FormControl('',[Validators.required])
        });
      }
      this.formGroupCall = this.fb.group({
        phone_to_call: new FormControl<string>('', [Validators.required,Validators.pattern('[- +()0-9]+'),Validators.minLength(8)]),
        from: new FormControl<string>('', [Validators.required]),
        to: new FormControl<string>('', [Validators.required]),
      });
  
      this.mentor.experiences = data.mentor.experiences.map((exp) => parseInt(exp.experience_type));
    });
    this.profileVisited()
    this.modalbooking.nativeElement.setAttribute('aria-hidden', 'true');
    this.modalCall.nativeElement.setAttribute('aria-hidden', 'true');
    this.modalPhone.nativeElement.setAttribute('aria-hidden', 'true');
  }

  openBooking(){
    this.modalbooking.nativeElement.setAttribute('aria-hidden', 'false');
  }

  closeBooking() {
    this.modalbooking.nativeElement.setAttribute('aria-hidden', 'true');
    this.success = false;
    this.errorMessage = '';
  }

  openCall(){
    this.modalCall.nativeElement.setAttribute('aria-hidden', 'false');
  }

  closePhone() {
    this.modalPhone.nativeElement.setAttribute('aria-hidden', 'true');
    this.showToast = false
  }

  callMentor(){
    this.modalPhone.nativeElement.setAttribute('aria-hidden', 'false');
    const userData = {
      mentor_id: this.mentor.id,
    }
    this.mentorService.profileCalled(userData).subscribe(
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


  closeCall() {
    this.modalCall.nativeElement.setAttribute('aria-hidden', 'true');
    this.success = false;
    this.errorMessage = '';
  }

  bookMentor() {
    this.formGroupBooking.value.mentor_id = this.mentor.id;
    this.formGroupBooking.value.experience_type = this.selectedTypeExperience;
    this.mentorService.bookMentor(this.formGroupBooking.value).subscribe(
      {
        next: (res) => {
          this.success = true;
          this.errorMessage = '';
        },
        error: (error) => {
          this.success = false;
          this.errorMessage = error.message
        },
        complete: () => console.log('complete')
      }
    )
  }

  bookCall() {
    this.formGroupCall.value.mentor_id = this.mentor.id;
    this.formGroupCall.value.accepted = false;
    this
    this.mentorService.bookCall(this.formGroupCall.value).subscribe(
      {
        next: (res) => {
          this.success = true;
          this.errorMessage = '';
        },
        error: (error) => {
          this.success = false;
          this.errorMessage = error.message
        },
        complete: () => console.log('complete')
      }
    )
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

  copyPhone() {
    navigator.clipboard.writeText(this.mentor.phone)
      .then(() => {
        this.showToast = true;

        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      })
      .catch((error) => {
        console.error('Error copying text to clipboard: ', error);
      });
  }

  // redirect to a message page with mentor 
  goToMessage() {
    this.router.navigate(['profile', 'messages', this.mentor.id , 'mentor']);
  }

}
