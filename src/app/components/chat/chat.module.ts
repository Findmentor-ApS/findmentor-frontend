import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { MessagingComponent } from './messaging/messaging.component';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';


@NgModule({
  declarations: [
    MessagingComponent,
    ChatLayoutComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ChatRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [SharedVariablesService],
})
export class ChatModule { }
