import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';
import { ProfileResolver } from 'src/app/resolvers/profile.resolver';
import { EditProfileComponent } from './account/edit-profile/edit-profile.component';
import { ExperienceProfileComponent } from './account/experience-profile/experience-profile.component';
import { ImageProfileComponent } from './account/image-profile/image-profile.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { OverviewComponent } from './mentor/overview/overview.component';
import { ClientsComponent } from './commune/clients/clients.component';
import { TypeGuard } from 'src/app/guards/type.guard';
import { EditContactsComponent } from './account/edit-contacts/edit-contacts.component';
import { ClientsResolver } from 'src/app/resolvers/clients.resolver';
import { EditSettingComponent } from './account/edit-setting/edit-setting.component';


const routes: Routes = [
  {path:'', redirectTo:'account/edit', pathMatch:'full'},
  {path:'account', component:ProfileLayoutComponent,resolve: {user: ProfileResolver}, canActivate: [AuthGuard], children:[
    {path: '', redirectTo:'edit' ,pathMatch:'full'},
    {path:'edit', component:EditProfileComponent, resolve: {user: ProfileResolver}, canDeactivate: [UnsavedChangesGuard]},
    {path:'experience', component:ExperienceProfileComponent, resolve: {user: ProfileResolver},data: { allowedTypes: ['mentor'] },  canActivate: [TypeGuard] },
    {path:'image', component:ImageProfileComponent, resolve: {user: ProfileResolver}},
    {path:'contact', component:EditContactsComponent, resolve: {user: ProfileResolver}, data: { allowedTypes: ['mentor'] },  canActivate: [TypeGuard]},
    {path:'settings', component:EditSettingComponent, resolve: {user: ProfileResolver}, data: { allowedTypes: ['mentor'] },  canActivate: [TypeGuard]},
  ]
  },
  {path:'overview', component:OverviewComponent, resolve: {user: ProfileResolver},  canActivate: [AuthGuard]},
  {path:'clients',pathMatch:'full', component:ClientsComponent, resolve: {user: ProfileResolver, clients: ClientsResolver},data: { allowedTypes: ['commune'] }, canActivate: [AuthGuard, TypeGuard]},
  // {path:'chat', component:ChatComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
