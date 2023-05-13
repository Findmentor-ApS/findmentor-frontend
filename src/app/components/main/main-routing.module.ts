import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorResolver } from 'src/app/resolvers/mentor.resolver';
import { LayoutComponent } from '../layout/layout/layout.component';
import { BlivMentorComponent } from './bliv-mentor/bliv-mentor.component';
import { HomeComponent } from './home/home.component';
import { MentorDetailComponent } from './mentor-detail/mentor-detail.component';
import { WhatIsAMentorComponent } from './what-is-a-mentor/what-is-a-mentor.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'bliv-mentor', component: BlivMentorComponent },
            { path: 'hvad-er-en-mentor', component: WhatIsAMentorComponent },
            { path: 'mentors/:id', component: MentorDetailComponent, resolve: {mentor: MentorResolver}, },
        ]
    }
    // {path: '', redirectTo:'home' ,pathMatch:'full' },
    // { path: 'home', component:  HomeComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
