import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout/layout.component';
import { BlivMentorComponent } from './bliv-mentor/bliv-mentor.component';
import { FindMentorComponent } from './find-mentor/find-mentor.component';
import { HomeComponent } from './home/home.component';
import { MentorDetailComponent } from './mentor-detail/mentor-detail.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'bliv-mentor', component: BlivMentorComponent },
            { path: 'find-mentor', component: FindMentorComponent },
            { path: 'mentor-detail', component: MentorDetailComponent },
            { path: 'overview', component: OverviewComponent }
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
