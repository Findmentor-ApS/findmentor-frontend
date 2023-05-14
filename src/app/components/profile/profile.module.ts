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
import { EditLanguagesComponent } from './account/edit-languages/edit-languages.component';
import { ProfileResolver } from 'src/app/resolvers/profile.resolver';
import { MessageComponent } from './message/message.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EditLocationsComponent } from './account/edit-locations/edit-locations.component';
import { EditAudiencesComponent } from './account/edit-audiences/edit-audiences.component';
import { FindMentorComponent } from './find-mentor/find-mentor.component';
import { MentorListComponent } from './mentor-list/mentor-list.component';
import { EditPriceComponent } from './account/edit-price/edit-price.component';
import { EditApproachComponent } from './account/edit-approach/edit-approach.component';


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
    EditSettingComponent,
    EditLanguagesComponent,
    MessageComponent,
    EditLocationsComponent,
    EditAudiencesComponent,
    FindMentorComponent,
    MentorListComponent,
    EditPriceComponent,
    EditApproachComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ProfileRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    ImageCropperModule,
    InfiniteScrollModule
  ],
  providers: [SharedVariablesService, ProfileResolver],
})
export class ProfileModule { }
