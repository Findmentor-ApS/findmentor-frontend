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

  constructor(private profileService: ProfileService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { clients: any }) => {
      this.clients = Object.values(data.clients);
    });
    console.log(this.clients)
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