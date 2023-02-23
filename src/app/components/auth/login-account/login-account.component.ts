import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.css']
})
export class LoginAccountComponent implements OnInit {
  card1 =false;
  card2 = false;
  card3 =false;
  constructor() { }

  ngOnInit(): void {
  }

}
