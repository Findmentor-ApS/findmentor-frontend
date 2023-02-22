import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() control= new FormControl();
  @Input() label: string = '';
  @Input() inputId: '';
  @Input() type: string = 'text';
  @Input() required: boolean = true;
  @Input() placeHolder: string = '';
  @Input() hintMessage: string = '';
  @Input() errorMessage: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  displayErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}