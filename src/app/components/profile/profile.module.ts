import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ProfileSidebarComponent } from './profile-sidebar/profile-sidebar.component';
import { EditProfileComponent } from './account/edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ExperienceProfileComponent } from './account/experience-profile/experience-profile.component';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageProfileComponent } from './account/image-profile/image-profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OverviewComponent } from './mentor/overview/overview.component';
import { ClientsComponent } from './commune/clients/clients.component';
import { EditContactsComponent } from './account/edit-contacts/edit-contacts.component';
import { EditSettingComponent } from './account/edit-setting/edit-setting.component';


@NgModule({
  declarations: [
    ProfileLayoutComponent,
    ProfileSidebarComponent,
    EditProfileComponent,
    ExperienceProfileComponent,
    ImageProfileComponent,
    OverviewComponent,
    ClientsComponent,
    EditContactsComponent,
    EditSettingComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ProfileRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    ImageCropperModule
  ],
  providers: [SharedVariablesService],
})
export class ProfileModule { }
