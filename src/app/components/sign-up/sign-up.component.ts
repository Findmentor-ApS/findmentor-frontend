import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userType: string;
  formGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required,Validators.pattern('[- +()0-9]+'),Validators.minLength(8)]),
    email: new FormControl('',[Validators.required, Validators.email]),
  });
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService) { }
  ngOnInit(): void {
    this.userType = this.route.snapshot.paramMap.get('type');
  }
  signup(){
    this.authService.register(this.userType, this.formGroup.value).subscribe((res: any) => {
      console.log(res);
    });
  }
}