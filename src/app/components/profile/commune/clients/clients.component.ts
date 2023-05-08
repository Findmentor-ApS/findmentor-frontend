import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  tableData;
  pageSize;
  bookings: any;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.profileService.getBookings().subscribe((response: any) => {
      this.bookings = response;
    });
    console.log(this.bookings);
    this.tableData = tableData
    this.pageSize = 10
  }

  changePageSize(event){
    this.pageSize = event;
  }
  
}

export const tableData =[
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},
  {type:'Besked', inquiry:'Depression', date:'06.06.2022 - 18:40',name: 'Deniz Dogan',note:' Hej! Dette er en note testing '},

]