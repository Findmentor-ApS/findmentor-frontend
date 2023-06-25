import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string = '';
  @Input() inputId: '';
  @Input() type: string = 'text';
  @Input() required: boolean = true;
  @Input() placeholder: string = '';
  @Input() hintMessage: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() validators: ValidatorFn[] = []; // <-- Add this



  constructor() { }


  ngOnInit(): void {
    this.updateValidators();
    this.updateDisabledState();
  }

  updateValidators() {
    this.control.setValidators(this.validators);
    this.control.updateValueAndValidity();
  }


  updateDisabledState() {
    if (this.disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  displayErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
