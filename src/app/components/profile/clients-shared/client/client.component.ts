import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { experienceType, helpType } from 'src/app/general/types';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  userType: string = '';

  tableDataBookings;
  pageSizeBookings;
  bookings: any;
  currentPageBookings: number = 1;
  totalItemsBookings: number = 0;

  constructor(private profileService: ProfileService, private route: ActivatedRoute, @Inject('ASSET_PATH') public assetPath: string) { }

  ngOnInit(): void {
    this.userType = localStorage.getItem('type');
    this.pageSizeBookings = 10;
    this.loadBookings();
  }

  loadBookings(): void {
    this.profileService.getBookings(this.currentPageBookings, this.pageSizeBookings, 1).subscribe(response => {
      this.totalItemsBookings = response['total'];
      this.bookings = Object.values(response);
      console.log(this.bookings);
      this.bookings.pop();
    });
  }

  changePageSizeBookings(event): void {
    this.pageSizeBookings = event;
    this.currentPageBookings = 1; // Reset to the first page.
    this.loadBookings();
  }

  prevPageBookings(): void {
    if (this.currentPageBookings > 1) {
      this.currentPageBookings--;
      this.loadBookings();
    }
  }

  nextPageBookings(): void {
    if ((this.currentPageBookings) * this.pageSizeBookings < this.totalItemsBookings) {
      this.currentPageBookings++;
      this.loadBookings();
    }
  }

  getExperienceTypeName(typeId: number | string): string {
    const id = typeof typeId === 'string' ? parseInt(typeId, 10) : typeId;
    const experience = experienceType.find(item => item.id === id);
    return experience ? experience.name : '';
  }


  getHelpType(typeId: number | string): string {
    const id = typeof typeId === 'string' ? parseInt(typeId, 10) : typeId;
    const help = helpType.find(item => item.id === id);
    return help ? help.name : '';
  }

}
