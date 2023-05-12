import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  agreementList;
  tableData;
  pageSize;
  user: any;
  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.user = this.userDataService.getCurrentUser();
    this.agreementList = agreementList;
    this.tableData = tableData
    this.pageSize = 10;
    console.log(this.user);
  }
  changePageSize(event){
    this.pageSize = event;
  }
}
export const agreementList =[
  {title: 'Jonas Nielsen', tag:'Depression', address: 'Falkoner Alle 33, St.2000 Frederiksberg', date:'Mandag 06.06.2022 - 18:00'},
  {title: 'Ali Ahmad', tag:'Angst', address: 'Falkoner Alle 33, St.2000 Frederiksberg', date:'Mandag 06.06.2022 - 21:00'},
  {title: 'Thomas Skov', tag:'Depression', address: 'Falkoner Alle 33, St.2000 Frederiksberg', date:'Tirsdag 07.06.2022 - 18:00'},
  {title: 'Jonas Nielsen', tag:'Depression', address: 'Falkoner Alle 33, St.2000 Frederiksberg', date:'Mandag 06.06.2022 - 18:00'},
  {title: 'Ali Ahmad', tag:'Angst', address: 'Falkoner Alle 33, St.2000 Frederiksberg', date:'Mandag 06.06.2022 - 21:00'},
  {title: 'Jonas Nielsen', tag:'Depression', address: 'Falkoner Alle 33, St.2000 Frederiksberg', date:'Mandag 06.06.2022 - 18:00'}

]

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