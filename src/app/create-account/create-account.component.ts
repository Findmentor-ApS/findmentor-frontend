import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  card1 =false;
  card2 = false;
  card3 =false;
  constructor() { }

  ngOnInit(): void {
  }
  // checkVisited(cardData){
  //   console.log(cardData);
  //   this.isVisited = !this.isVisited;
  // }

}
