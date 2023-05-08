import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  tableData;
  pageSize;

  ngOnInit(): void {
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