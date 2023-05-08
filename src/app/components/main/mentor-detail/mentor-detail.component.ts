import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { experienceType } from 'src/app/general/types';
import * as DKFDS from 'dkfds'
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-mentor-detail',
  templateUrl: './mentor-detail.component.html',
  styleUrls: ['./mentor-detail.component.css']
})
export class MentorDetailComponent implements OnInit {

  @ViewChild('modalBooking') modalbooking: ElementRef<any>;
  @ViewChild('modalCall') modalCall: ElementRef<any>;

  mentor: any;
  formGroupBooking: FormGroup;
  formGroupCall: FormGroup;
  experienceTypeMap: {[key: number]: string} = {};
  type = '';
  success = false;
  errorMessage = '';
  

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private mentorService: MentorService) { }

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    experienceType.forEach(type => {
      this.experienceTypeMap[type.id] = type.name;
    });
    new DKFDS.datePicker.on(document.body);

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
    this.modalbooking.nativeElement.setAttribute('aria-hidden', 'true');
    this.modalCall.nativeElement.setAttribute('aria-hidden', 'true');

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

  closeCall() {
    this.modalCall.nativeElement.setAttribute('aria-hidden', 'true');
    this.success = false;
    this.errorMessage = '';
  }

  bookMentor() {
    this.formGroupBooking.value.mentor_id = this.mentor.id;
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

}
