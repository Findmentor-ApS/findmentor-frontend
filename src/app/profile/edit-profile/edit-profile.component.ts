import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      Fornavn: ['Thomas', Validators.required],
      Efternavn:['Christiansen', Validators.required],
      Gade: ['Frederiksberg Alle',Validators.required],
      Husnummer:['',Validators.required],
      Etage:[''],
      Side:[''],
      Postnummer:['',Validators.required],
      By:['', Validators.required],
      Uddannelse:['',Validators.required],
      kon:['',Validators.required],
      Telefon:['',Validators.required],
      email:['',Validators.required],
      Hjemmeside:['',Validators.required],
      Beskrivelse:['',Validators.required]
    });  
  }
updateProfile(){
  console.log(this.formGroup.value);
}
reroute(){
  alert('working')
}
}
