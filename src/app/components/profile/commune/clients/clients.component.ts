import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  tableData;
  pageSize;
  clients: any;
  currentPage: number = 1;
  totalItems: number = 0;
  userType: string = '';

  constructor(private profileService: ProfileService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userType = localStorage.getItem('type');
    this.pageSize = 10;
    this.loadClients();
  }

  loadClients(): void {
    this.profileService.getBookings(this.currentPage, this.pageSize).subscribe(response => {
      this.totalItems = response['total'];
      this.clients = Object.values(response);
      // remove total from response
      this.clients.pop();
      // If the response includes a total count, use it to calculate the total pages.
    });
  }

  changePageSize(event): void {
    this.pageSize = event;
    this.currentPage = 1; // Reset to the first page.
    this.loadClients();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadClients();
    }
  }

  nextPage(): void {
    if ((this.currentPage) * this.pageSize < this.totalItems) {
      this.currentPage++;
      this.loadClients();
    }
  }

  ceil(number: number): number {
    return Math.ceil(number);
  }
}
