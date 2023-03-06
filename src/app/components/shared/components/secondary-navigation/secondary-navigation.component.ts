import { Component, HostListener, OnInit } from '@angular/core';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-secondary-navigation',
  templateUrl: './secondary-navigation.component.html',
  styleUrls: ['./secondary-navigation.component.css']
})
export class SecondaryNavigationComponent implements OnInit {
  type: string;
  is_avaliable: boolean;
  isSmallScreen = false;
  constructor(private sharedService: SharedVariablesService) { }

  onCheckboxChange() {
    this.sharedService.isAvailable$.next(this.is_avaliable);
  }

  ngOnInit(): void {
    this.sharedService.isAvailable$.subscribe((isAvailable) => {
      this.is_avaliable = isAvailable;
    });
    this.type = localStorage.getItem('type');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth < 992) {
      this.isSmallScreen = true;
    }
    else this.isSmallScreen = false;
  }

}
