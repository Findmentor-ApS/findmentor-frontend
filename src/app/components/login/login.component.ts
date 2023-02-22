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

  userType: string;
  formGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
  });
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.userType = this.route.snapshot.paramMap.get('type');
  }



  login(){
    this.authService.login(this.userType, this.formGroup.value).subscribe((res: any) => {
      console.log(res);
    });
  }

}