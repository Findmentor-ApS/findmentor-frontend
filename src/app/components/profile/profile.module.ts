import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ProfileSidebarComponent } from './profile-sidebar/profile-sidebar.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ExperienceProfileComponent } from './experience-profile/experience-profile.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ProfileLayoutComponent,
    ProfileSidebarComponent,
    EditProfileComponent,
    ExperienceProfileComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ProfileRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProfileModule { }
