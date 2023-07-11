import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { helpType } from 'src/app/general/types';
import { MentorService } from 'src/app/services/mentor.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent implements OnInit {

  @Input() booking: any;
  @Input() mentor: any;
  @Input() type: string;
  @Output() closeModal = new EventEmitter<void>();
  @Input() isModalVisible = false; // <- Add this variable
  @Input() fieldConfig: any; // <-- Add this to accept a configuration object

  userType: string = '';
  accepted: boolean = false;
  declined: boolean = false;
  isStatusDisabled: boolean = false;

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
    help_type: [Validators.required],
    is_final_evaluation: [] // No validators for boolean field
  };
  formGroupBooking: FormGroup;

  is_final_evaluation: boolean; // Add this property
  success = false;
  errorMessage = '';
  helpType = helpType;
  selectedHelpType: any;

  constructor(private fb: FormBuilder, private mentorService: MentorService, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.userType = localStorage.getItem('type');
    this.initializeForm();
  }

  getHelpType(typeId: number | string): string {
    const id = typeof typeId === 'string' ? parseInt(typeId, 10) : typeId;
    const help = helpType.find(item => item.id === id);
    return help ? help.name : '';
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
    this.formGroupBooking.value.help_type = this.selectedHelpType;
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
        'help_type', 'is_final_evaluation'
      ];

      // Creating config for each field
      communeFields.forEach(fieldName => {
        // If a booking is provided and contains this field, use the booking's value as the initial value
          
        const initialValue = this.booking && this.booking[fieldName] ? this.booking[fieldName] : '';
        if(fieldName == 'help_type' && initialValue) {
          this.selectedHelpType = initialValue;
        }
        fieldsConfig[fieldName] = [initialValue, this.validatorsConfig[fieldName]];
      });
    } else if (this.type == 'user') {
      // Only 'help_text' field is required for 'user' type
      const initialValue = this.booking && this.booking.help_text ? this.booking.help_text : '';
      fieldsConfig = {
        help_text: [initialValue, this.validatorsConfig.help_text]
      };
    }

    // Creating the form group
    this.formGroupBooking = this.fb.group(fieldsConfig);
  }

  acceptBookingRequest(id: number): void { 
    this.accepted = true;
    this.declined = false;
    this.isStatusDisabled = true;
    this.formGroupBooking.disable();
    this.profileService.acceptBookingRequest(id).subscribe(response => {
    });
    setTimeout(() => {
      this.accepted = false;
      this.closeModal.emit();
      window.location.reload();

    }, 3000);
  }

  declineBookingRequest(id: number): void {
    this.accepted = false;
    this.declined = true;
    this.isStatusDisabled = true;
    this.formGroupBooking.disable();
    this.profileService.declineBookingRequest(id).subscribe(response => {
    });
    setTimeout(() => {
      this.declined = false;
      this.closeModal.emit();
      // reload page
      window.location.reload();
    }, 3000);


  }

  hideToast() {
    this.accepted = false;
  }
}
