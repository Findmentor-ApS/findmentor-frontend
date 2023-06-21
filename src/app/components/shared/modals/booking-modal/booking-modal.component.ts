import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { experienceType } from 'src/app/general/types';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent implements OnInit {

  @Input() mentor: any;
  @Input() type: string;
  @Output() closeModal = new EventEmitter<void>();
  @Input() isModalVisible = false; // <- Add this variable

  formGroupBooking: FormGroup;
  success = false;
  errorMessage = '';
  experienceType = experienceType;
  selectedTypeExperience: any;

  constructor(private fb: FormBuilder, private mentorService: MentorService) {}

  ngOnInit(): void {
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
        type_experience: new FormControl('',[Validators.required]),
      });  
    }
    else if(this.type == 'user') {
      this.formGroupBooking = this.fb.group({
        help_text: new FormControl('',[Validators.required]),
        selectedTypeExperienceControl: new FormControl('',[Validators.required]),
      });
    }
  }

  openBooking() {
    this.isModalVisible = true; // <- Set the modal to visible
  }

  closeBooking() {
    this.isModalVisible = false; // <- Set the modal to hidden
    this.closeModal.emit();
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
}
