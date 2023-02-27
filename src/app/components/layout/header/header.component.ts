import { Component, HostListener, OnInit } from '@angular/core';
import { Navigation } from 'node_modules/dkfds/dist/js/dkfds.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  signInCondition: boolean = true ;
  isNav = false;
  isSmallScreen = false;
  // nav: Navigation;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('access_token') && localStorage.getItem('type')){
      this.signInCondition = true;
    }
    else{
      this.signInCondition = false;
    }
    if(window.innerWidth < 992) this.isSmallScreen = true;
    else this.isSmallScreen = false;

   }

  //  ngAfterViewInit() {
  //   this.nav = new Navigation();
  //   window.addEventListener('resize', () => {
  //     // destroy the existing navigation instance
  //     new Navigation().destroy();
  //     // create a new instance of the navigation
  //     new Navigation().init();
  //   });
  // }

  signIn(){
    this.signInCondition = ! this.signInCondition;
   }
   logOut(){
    this.signInCondition = ! this.signInCondition;
   }

   load(){
    const bodyTag = document.body;
    if(!this.isNav){
      bodyTag.classList.add('mobile_nav-active');
    }
    else{
      bodyTag.classList.remove('mobile_nav-active');
    }
    this.isNav = !this.isNav;
    console.log("fads");
    // bodyTag.classList.add('nav login is-visible');
   }

   removeHamburger(){
    this.isNav = false;
    console.log(2);
    const bodyTag = document.body;
    bodyTag.classList.remove('mobile_nav-active');
    // bodyTag.classList.remove('nav login is-visible');
   }

   @HostListener('window:resize', ['$event'])
    onResize(event) {
      if(window.innerWidth < 992) this.isSmallScreen = true;
      else this.isSmallScreen = false;
    }
}
