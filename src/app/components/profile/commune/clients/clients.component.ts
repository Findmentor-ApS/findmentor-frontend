import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  userType: string = '';

  tableDataBookings;
  pageSizeBookings;
  bookings: any;
  currentPageBookings: number = 1;
  totalItemsBookings: number = 0;
  
  tableDataCalls;
  pageSizeCalls;
  calls: any;
  currentPageCalls: number = 1;
  totalItemsCalls: number = 0;
  constructor(private profileService: ProfileService, private route: ActivatedRoute,@Inject('ASSET_PATH') public assetPath: string) {
  }

  ngOnInit(): void {
    this.userType = localStorage.getItem('type');
    this.pageSizeBookings = 10;
    this.pageSizeCalls = 10;
    this.loadBookings();
    this.loadCalls();
  }


  loadBookings(): void {
    this.profileService.getBookings(this.currentPageBookings, this.pageSizeBookings).subscribe(response => {
      this.totalItemsBookings = response['total'];
      this.bookings = Object.values(response);
      //print bookings
      //console.log(this.bookings);
      // remove total from response
      this.bookings.pop();
      // If the response includes a total count, use it to calculate the total pages.
    });
  }

  loadCalls(): void {
    this.profileService.getCalls(this.currentPageCalls, this.pageSizeCalls).subscribe(response => {
      this.totalItemsCalls = response['total'];
      this.calls = Object.values(response);
      //console.log(this.calls);
      // remove total from response
      this.calls.pop();
      // If the response includes a total count, use it to calculate the total pages.
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

  changePageSizeCalls(event): void {
    this.pageSizeCalls = event;
    this.currentPageCalls = 1; // Reset to the first page.
    this.loadCalls();
  }

  prevPageCalls(): void {
    if (this.currentPageCalls > 1) {
      this.currentPageCalls--;
      this.loadCalls();
    }
  }

  nextPageCalls(): void {
    if ((this.currentPageCalls) * this.pageSizeCalls < this.totalItemsCalls) {
      this.currentPageCalls++;
      this.loadCalls();
    }
  }

  ceil(number: number): number {
    return Math.ceil(number);
  }
}
