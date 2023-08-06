import { Component, Inject, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  pageSize;
  user: any;
  calls: any[] = [];
  pageSizeCalls;
  currentPageCalls: number = 1;
  totalItemsCalls: number = 0;
  constructor(private userDataService: UserDataService, private profileService: ProfileService, @Inject('ASSET_PATH') public assetPath: string) { }

  ngOnInit(): void {
    this.user = this.userDataService.getCurrentUser();
    this.pageSize = 10;
    this.pageSizeCalls = 10;
    this.loadCalls();
  }
  changePageSize(event){
    this.pageSize = event;
  }
  loadCalls(): void {
    this.profileService.getCalls(this.currentPageCalls, this.pageSizeCalls).subscribe(response => {
      this.totalItemsCalls = response['total'];
      this.calls = Object.values(response);
      console.log(this.calls);
      // remove total from response
      this.calls.pop();
      // If the response includes a total count, use it to calculate the total pages.
    });
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
