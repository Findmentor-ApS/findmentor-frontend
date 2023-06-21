import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-phone-modal',
  templateUrl: './phone-modal.component.html',
  styleUrls: ['./phone-modal.component.css']
})
export class PhoneModalComponent {

  @Input() mentor: any;
  @Input() type: string;
  @Output() closeModal = new EventEmitter<void>();
  @Input() isModalVisible = false; // <- Add this variable

  formGroupCall: FormGroup;
  success = false;
  errorMessage = '';
  showToast= false;

  constructor(private fb: FormBuilder, private mentorService: MentorService) {}
  ngOnInit(): void {

  }

  openPhone() {
    this.isModalVisible = true; // <- Set the modal to visible
  }

  closePhone() {
    this.isModalVisible = false; // <- Set the modal to hidden
    this.closeModal.emit();
    this.success = false;
    this.errorMessage = '';
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
        console.error('Der er opstået en fejl', error);
      });
  }
}
