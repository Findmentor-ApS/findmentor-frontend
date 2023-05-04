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

  @ViewChild('modal') modal: ElementRef<any>;
  mentor: any;
  formGroup: FormGroup;
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
      if(this.type == 'mentor') {
        this.formGroup = this.fb.group({
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
      if(this.type == 'commune') {
        this.formGroup = this.fb.group({
          help_text: new FormControl('',[Validators.required]),
          first_name: new FormControl('',[Validators.required]),
          last_name: new FormControl('',[Validators.required]),
        });
      }
  
      this.mentor.experiences = data.mentor.experiences.map((exp) => parseInt(exp.experience_type));
    });
    this.modal.nativeElement.setAttribute('aria-hidden', 'true');
  }

  openModal(){
    this.modal.nativeElement.setAttribute('aria-hidden', 'false');
  }

  closeModal() {
    this.modal.nativeElement.setAttribute('aria-hidden', 'true');
  }

  bookMentor() {
    this.formGroup.value.recipient_id = this.mentor.id;
    this.mentorService.bookMentor(this.formGroup.value).subscribe(
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
