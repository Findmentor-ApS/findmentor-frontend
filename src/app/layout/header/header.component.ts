import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  signInCondition: boolean = false ;
  logOutCondition: boolean = true ;


  constructor() { }
 signIn(){
  this.signInCondition = ! this.signInCondition;
  this.logOutCondition = ! this.logOutCondition;
 }
 logOut(){
  this.logOutCondition = ! this.logOutCondition;
  this.signInCondition = ! this.signInCondition;
 }
  ngOnInit(): void {

  }

}
