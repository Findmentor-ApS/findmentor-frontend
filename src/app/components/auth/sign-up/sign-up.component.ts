import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userType: string;
  errorMessage = '';
  success = false;
  formGroup: FormGroup<{
    first_name: FormControl<string>,
    last_name:  FormControl<string>,
    street: FormControl<string>,
    city:  FormControl<string>,
    gender: FormControl<boolean>,
    phone:  FormControl<string>,
    email:  FormControl<string>,
  }>;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService) { }
  ngOnInit(): void {
    this.userType = this.route.snapshot.paramMap.get('type');
    this.formGroup = new FormGroup({
      first_name: new FormControl<string>('',[Validators.required]),
      last_name: new FormControl<string>('',[Validators.required]),
      street: new FormControl<string>('',[Validators.required]),
      city: new FormControl<string>('',[Validators.required]),
      gender: new FormControl<boolean>(null,[Validators.required]),
      phone: new FormControl<string>('', [Validators.required,Validators.pattern('[- +()0-9]+'),Validators.minLength(8)]),
      email: new FormControl<string>('',[Validators.required, Validators.email]),
    });
  }
  signup(){
    this.authService.register(this.userType, this.formGroup.value).subscribe(
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