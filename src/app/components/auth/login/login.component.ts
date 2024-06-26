import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  success = false;
  userType: string;

  formGroup: FormGroup<{
    email: FormControl<string | null>
  }>;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.userType = this.route.snapshot.paramMap.get('type');
    this.formGroup = new FormGroup({
      email: new FormControl<string | null>('',[Validators.required, Validators.email]),
    });
  
  }



  login(){
    this.authService.login(this.userType, this.formGroup.value).subscribe(
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
