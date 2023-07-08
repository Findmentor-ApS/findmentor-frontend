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
import { BookingComponent} from './commune/booking/booking.component';
import { TypeGuard } from 'src/app/guards/type.guard';
import { EditContactsComponent } from './account/edit-contacts/edit-contacts.component';
import { ClientsResolver } from 'src/app/resolvers/clients.resolver';
import { EditSettingComponent } from './account/edit-setting/edit-setting.component';
import { EditLanguagesComponent } from './account/edit-languages/edit-languages.component';
import { MessageComponent } from './message/message.component';
import { EditLocationsComponent } from './account/edit-locations/edit-locations.component';
import { EditAudiencesComponent } from './account/edit-audiences/edit-audiences.component';
import { FindMentorComponent } from './find-mentor/find-mentor.component';
import { SearchResolver } from 'src/app/resolvers/search.resolver';
import { EditPriceComponent } from './account/edit-price/edit-price.component';
import { EditApproachComponent } from './account/edit-approach/edit-approach.component';
import { ClientComponent } from './clients-shared/client/client.component';


const routes: Routes = [
  {path:'', redirectTo:'account/edit', pathMatch:'full'},
  {path:'account', component:ProfileLayoutComponent,resolve: {user: ProfileResolver}, canActivate: [AuthGuard], children:[
    {path: '', redirectTo:'edit' ,pathMatch:'full'},
    {path:'edit', component:EditProfileComponent, resolve: {user: ProfileResolver}, canDeactivate: [UnsavedChangesGuard]},
    {path:'experience', component:ExperienceProfileComponent, resolve: {user: ProfileResolver},data: { allowedTypes: ['mentor'] },  canActivate: [TypeGuard] },
    {path:'image', component:ImageProfileComponent, resolve: {user: ProfileResolver}},
    {path:'contact', component:EditContactsComponent, resolve: {user: ProfileResolver}, data: { allowedTypes: ['mentor'] },  canActivate: [TypeGuard]},
    {path:'settings', component:EditSettingComponent,resolve: {user: ProfileResolver}, data: { allowedTypes: ['mentor'] },  canActivate: [TypeGuard]},
    {path:'language', component:EditLanguagesComponent, resolve: {user: ProfileResolver}, data: { allowedTypes: ['mentor'] },  canActivate: [TypeGuard]},
    {path:'location', component:EditLocationsComponent, resolve: {user: ProfileResolver}, data: { allowedTypes: ['mentor'] },  canActivate: [TypeGuard]},
    {path:'audience', component:EditAudiencesComponent, resolve: {user: ProfileResolver}, data: { allowedTypes: ['mentor'] },  canActivate: [TypeGuard]},
    {path:'price', component:EditPriceComponent, resolve: {user: ProfileResolver}, data: { allowedTypes: ['mentor'] },  canActivate: [TypeGuard]},
    {path:'approach', component:EditApproachComponent, resolve: {user: ProfileResolver}, data: { allowedTypes: ['mentor'] },  canActivate: [TypeGuard]},
  ]
  },
  {path:'overview',pathMatch:'full', component:OverviewComponent, resolve: {user: ProfileResolver},data: { allowedTypes: ['mentor'] },  canActivate: [AuthGuard,TypeGuard]},
  { path: 'messages', component: MessageComponent, resolve: { user: ProfileResolver }, canActivate: [AuthGuard] },
  { path: 'messages/:id/:type', component: MessageComponent, resolve: { user: ProfileResolver }, canActivate: [AuthGuard] },
  {path:'clients',pathMatch:'full', component:ClientComponent, resolve: {user: ProfileResolver},data: { allowedTypes: ['mentor'] },  canActivate: [AuthGuard,TypeGuard]},
  {path:'booking',pathMatch:'full', component:BookingComponent, resolve: {user: ProfileResolver},data: { allowedTypes: ['commune', 'mentor'] }, canActivate: [AuthGuard, TypeGuard]},
  // {path:'chat', component:ChatComponent, canActivate: [AuthGuard]}
  {path:'find-mentor',pathMatch:'full', component:FindMentorComponent,data: { allowedTypes: ['commune', 'user'] }, canActivate: [AuthGuard, TypeGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
