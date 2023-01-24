import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout/layout.component';
import { FindMentorComponent } from './find-mentor/find-mentor.component';
import { HomeComponent } from './home/home.component';
import { MentorDetailComponent } from './mentor-detail/mentor-detail.component';
import { OverviewComponent } from './overview/overview.component';
import { WhatIsAMentorComponent } from './what-is-a-mentor/what-is-a-mentor.component';

const routes: Routes = [
  {path:'', component:LayoutComponent, children:[
    {path: '', redirectTo:'home' ,pathMatch:'full' },
    {path:'home', component:HomeComponent},
    {path:'find-mentor', component:FindMentorComponent},
    {path:'what-is-a-mentor', component:WhatIsAMentorComponent},
    {path:'mentor-detail', component:MentorDetailComponent},
    {path:'overview', component:OverviewComponent}


  ]}
  // {path: '', redirectTo:'home' ,pathMatch:'full' },
  // { path: 'home', component:  HomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
