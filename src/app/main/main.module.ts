import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { FindMentorComponent } from './find-mentor/find-mentor.component';
import { MentorListComponent } from './mentor-list/mentor-list.component';
import { HomeComponent } from './home/home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { MentorDetailComponent } from './mentor-detail/mentor-detail.component';
import { OverviewComponent } from './overview/overview.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FindMentorComponent,
    MentorListComponent,
    HomeComponent,
    MentorDetailComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgSelectModule,
    FormsModule,
    SharedModule
  ]
})
export class MainModule { }
