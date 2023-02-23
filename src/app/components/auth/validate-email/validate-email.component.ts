import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.css']
})
export class ValidateEmailComponent implements OnInit {

  errorMessage = '';
  userType: string;
  loginToken: string;
  loading = true;
  success = false;
  error = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.userType = this.route.snapshot.paramMap.get('type');
    this.loginToken = this.route.snapshot.paramMap.get('verify_email_token');
    this.authService.validateEmail(this.userType, this.loginToken).subscribe(
      {
        next: (res) => {
          this.loading = false;
          this.success = true;
          this.error = false;
          this.errorMessage = '';
          setTimeout(() => {
            // Navigate to home page
            this.router.navigate(['/auth/login/'+this.userType]);
            
          }, 5000);
        },
        error: (error) => {
          this.loading = false;
          this.success = false;
          this.error = true;
          setTimeout(() => {
            // Navigate to home page
            this.router.navigate(['/home']);
            
          }, 5000);
          this.errorMessage = error.message
        },
        complete: () => console.log('complete')
      }
    );
  }

}
