import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SecondaryNavigationComponent } from './components/secondary-navigation/secondary-navigation.component';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area/text-area.component';
import { ASSET_PATH } from 'src/app/general/config';
import { ToastComponent } from './toast/toast.component';
import { BookingModalComponent } from './modals/booking-modal/booking-modal.component';
import { CallModalComponent } from './modals/call-modal/call-modal.component';
import { PhoneModalComponent } from './modals/phone-modal/phone-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    SecondaryNavigationComponent,
    InputComponent,
    TextAreaComponent,
    ToastComponent,
    BookingModalComponent,
    CallModalComponent,
    PhoneModalComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports:[
    SecondaryNavigationComponent,
    InputComponent,
    TextAreaComponent,
    ToastComponent,
    BookingModalComponent,
    CallModalComponent,
    PhoneModalComponent
  ],
  providers: [
    { provide: 'ASSET_PATH', useValue: ASSET_PATH }
  ],
})
export class SharedModule { }
