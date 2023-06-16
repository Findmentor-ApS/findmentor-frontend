import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';

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

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private router: Router, private userDataService: UserDataService) { }

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
          localStorage.setItem('access_token', res['access_token']);
          localStorage.setItem('type', this.userType);
          localStorage.setItem('name', res['first_name'] + ' ' + res['last_name']);
          // console.log(res);
          this.userDataService.setUser(res);

          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 5000);
        },
        error: (error) => {
          this.loading = false;
          this.success = false;
          this.error = true;
          setTimeout(() => {
            this.router.navigate(['/home']);
            
          }, 5000);
          this.errorMessage = error.message
        },
        complete: () => console.log('complete')
      }
    );
  }

}
