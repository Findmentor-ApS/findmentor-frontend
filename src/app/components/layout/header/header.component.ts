import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  signInCondition: boolean = true ;
  isNav = false;
  name = '';
  isSmallScreen = false;
  isAvailable = false;
  type = '';
  // nav: Navigation;
  constructor(private profileService: ProfileService,private router: Router, 
    private userDataService: UserDataService,@Inject('ASSET_PATH') public assetPath: string) { }

  ngOnInit(): void {
    if(localStorage.getItem('access_token') && localStorage.getItem('type')){
      this.name = localStorage.getItem('name');
      this.type = localStorage.getItem('type');
      this.name = this.name.replace(/['"]+/g, '')
      this.signInCondition = true;
    }
    else{
      this.signInCondition = false;
    }
    if(window.innerWidth < 992) this.isSmallScreen = true;
    else this.isSmallScreen = false;

    this.profileService.profileDeletedEvent.subscribe(
      () => {
        this.logout();
      }
    );
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

    logout(){
      localStorage.removeItem('access_token');
      localStorage.removeItem('type');
      localStorage.removeItem('name');
      localStorage.removeItem('id');
      localStorage.removeItem('isAvailable');
      this.profileService.setAvailable(false);
      this.isAvailable = false;
      this.signInCondition = false;
      this.name = '';
      this.type = '';
      this.userDataService.logout();
      this.router.navigate(['/home']);
    }

    isProfileMessagesRoute(): boolean {
      const currentRoute = this.router.url;
      return currentRoute.includes('/profile/messages');
    }
}
