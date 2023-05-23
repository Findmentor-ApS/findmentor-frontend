// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'angular13';
// }
import {Component, OnInit} from '@angular/core';
// import * as DKFDS from 'dkfds'
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'Angular 13 ';

    constructor() { }

    ngOnInit() {
      // new DKFDS.Navigation();
    }
}
