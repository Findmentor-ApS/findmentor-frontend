import { Component, OnInit } from '@angular/core';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-secondary-navigation',
  templateUrl: './secondary-navigation.component.html',
  styleUrls: ['./secondary-navigation.component.css']
})
export class SecondaryNavigationComponent implements OnInit {
  type: string;
  is_avaliable: boolean;
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

}
