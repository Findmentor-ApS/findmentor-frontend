import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validate-login',
  templateUrl: './validate-login.component.html',
  styleUrls: ['./validate-login.component.css']
})
export class ValidateLoginComponent implements OnInit {
  errorMessage = '';
  userType: string;
  loginToken: string;
  loading = true;
  success = false;
  error = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.userType = this.route.snapshot.paramMap.get('type');
    this.loginToken = this.route.snapshot.paramMap.get('login_token');
    this.authService.validateLogin(this.userType, this.loginToken).subscribe(
      {
        next: (res) => {
          this.loading = false;
          this.success = true;
          this.error = false;
          this.errorMessage = '';
          setTimeout(() => {
            console.log('sleep1');
            // Navigate to home page
            this.router.navigate(['/profile']);
            
          }, 5000);
        },
        error: (error) => {
          this.loading = false;
          this.success = false;
          this.error = true;
          setTimeout(() => {
            console.log('sleep2');
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
