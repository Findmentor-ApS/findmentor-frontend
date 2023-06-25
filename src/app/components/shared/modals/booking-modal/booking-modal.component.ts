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
  @Input() fieldConfig: any; // <-- Add this to accept a configuration object

  validatorsConfig = {
    help_text: [Validators.required],
    first_name: [Validators.required],
    last_name: [Validators.required],
    cpr_number: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)],
    phone: [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(8)],
    street: [Validators.required],
    city: [Validators.required],
    social_worker: [Validators.required],
    ean_nr: [Validators.required],
    goal: [Validators.required],
    start_date: [Validators.required],
    end_date: [Validators.required],
    type_experience: [Validators.required],
    is_final_evaluation: [] // No validators for boolean field
  };
  formGroupBooking: FormGroup;

  is_final_evaluation: boolean; // Add this property
  success = false;
  errorMessage = '';
  experienceType = experienceType;
  selectedTypeExperience: any;

  constructor(private fb: FormBuilder, private mentorService: MentorService) {}

  ngOnInit(): void {
    this.initializeForm();
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

  initializeForm() {
    let fieldsConfig = {};

    if (this.type == 'commune') {
      // List of fields that are required for 'commune' type
      const communeFields = [
        'help_text', 'first_name', 'last_name', 'cpr_number', 'phone', 'street',
        'city', 'social_worker', 'ean_nr', 'goal', 'start_date', 'end_date',
        'type_experience', 'is_final_evaluation'
      ];

      // Creating config for each field
      communeFields.forEach(fieldName => {
        fieldsConfig[fieldName] = ['', this.validatorsConfig[fieldName]];
      });
    } else if (this.type == 'user') {
      // Only 'help_text' field is required for 'user' type
      fieldsConfig = {
        help_text: ['', this.validatorsConfig.help_text]
      };
    }

    // Creating the form group
    this.formGroupBooking = this.fb.group(fieldsConfig);
  }
}
