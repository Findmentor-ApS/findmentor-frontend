import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secondary-navigation',
  templateUrl: './secondary-navigation.component.html',
  styleUrls: ['./secondary-navigation.component.css']
})
export class SecondaryNavigationComponent implements OnInit {
  type: string;
  constructor() { }


  ngOnInit(): void {
    this.type = localStorage.getItem('type');
  }

}
