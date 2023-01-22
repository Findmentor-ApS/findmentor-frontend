import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      fname: ['', Validators.required],
      lname:['', Validators.required],
      street: ['',Validators.required],
      by:['',Validators.required],
      gender:[''],
      telephone:[''],
      email:['',Validators.required],
    });  
  }
  signup(){
    console.log(this.formGroup.value);
  }

}
