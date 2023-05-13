import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MentorDetailComponent } from './mentor-detail/mentor-detail.component';
import { SharedModule } from '../shared/shared.module';
import { BlivMentorComponent } from './bliv-mentor/bliv-mentor.component';
import { WhatIsAMentorComponent } from './what-is-a-mentor/what-is-a-mentor.component';


@NgModule({
  declarations: [
    HomeComponent,
    BlivMentorComponent,
    WhatIsAMentorComponent,
    MentorDetailComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgSelectModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
