import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.css']
})
export class MentorListComponent implements OnInit,OnChanges {

  mentorList: any;
  tempMentorList: any[] ;

  @Input("index") index: number;

  constructor(private router: Router, private httpClient: HttpClient) {
    this.mentorList = [];
  }

  ngOnInit(): void {
    this.getMentorList();

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getMentorList();
  }

  getMentorList() {
    this.httpClient.get('http://localhost:3000/posts').subscribe((res: any) => {
      this.tempMentorList = res;
      if (this.tempMentorList && this.tempMentorList.length <= 10) {
        this.mentorList = this.tempMentorList;
      }
      else{

        if(this.mentorList.length >= this.tempMentorList.length){

          this.mentorList = [... this.tempMentorList]
        }else{
          this.mentorList = this.tempMentorList;
        this.mentorList.length = 10*this.index;
        }
      }

    });
  }
}
