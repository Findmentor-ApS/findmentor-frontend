import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit{
  @Input() control= new UntypedFormControl();
  @Input() label: string = '';
  @Input() textareaId: '';
  @Input() required: boolean = true;
  @Input() placeholder: string = '';
  @Input() hintMessage: string = '';
  @Input() errorMessage: string = '';
  @Input() rows: string = '6';
  @Input() maxlength: number;

  constructor() { }

  ngOnInit(): void {
  }

  displayErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
