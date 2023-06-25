import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit{
  @Input() control: FormControl;
  @Input() label: string = '';
  @Input() textareaId: '';
  @Input() required: boolean = true;
  @Input() placeholder: string = '';
  @Input() hintMessage: string = '';
  @Input() errorMessage: string = '';
  @Input() rows: string = '6';
  @Input() maxlength: number;
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
