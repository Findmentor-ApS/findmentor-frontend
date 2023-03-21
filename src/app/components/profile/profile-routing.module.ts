import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';
import { ProfileResolver } from 'src/app/resolvers/profile.resolver';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ExperienceProfileComponent } from './experience-profile/experience-profile.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';

const routes: Routes = [
  {path:'', redirectTo:'account/edit-profile', pathMatch:'full'},
  {path:'account', component:ProfileLayoutComponent, canActivate: [AuthGuard], children:[
    {path: '', redirectTo:'edit-profile' ,pathMatch:'full'},
    {path:'edit-profile', component:EditProfileComponent, resolve: {user: ProfileResolver}, canDeactivate: [UnsavedChangesGuard]},
    {path:'experience', component:ExperienceProfileComponent, resolve: {user: ProfileResolver}},
    ]
  },
  // {path:'chat', component:ChatComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
