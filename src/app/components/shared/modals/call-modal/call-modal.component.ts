import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-call-modal',
  templateUrl: './call-modal.component.html',
  styleUrls: ['./call-modal.component.css']
})
export class CallModalComponent {

  @Input() mentor: any;
  @Input() type: string;
  @Output() closeModal = new EventEmitter<void>();
  @Input() isModalVisible = false; // <- Add this variable

  formGroupCall: FormGroup;
  success = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private mentorService: MentorService) {}

  ngOnInit(): void {
    this.formGroupCall = this.fb.group({
      phone_to_call: new FormControl<string>('', [Validators.required,Validators.pattern('[- +()0-9]+'),Validators.minLength(8)]),
      from: new FormControl<string>('', [Validators.required]),
      to: new FormControl<string>('', [Validators.required]),
    });
  }

  openCall() {
    this.isModalVisible = true; // <- Set the modal to visible
  }

  closeCall() {
    this.isModalVisible = false; // <- Set the modal to hidden
    this.closeModal.emit();
    this.success = false;
    this.errorMessage = '';
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
