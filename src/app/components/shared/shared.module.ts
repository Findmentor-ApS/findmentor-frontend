import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SecondaryNavigationComponent } from './components/secondary-navigation/secondary-navigation.component';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area/text-area.component';
import { ASSET_PATH } from 'src/app/general/config';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    SecondaryNavigationComponent,
    InputComponent,
    TextAreaComponent,
    ToastComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SecondaryNavigationComponent,
    InputComponent,
    TextAreaComponent,
    ToastComponent,
  ],
  providers: [
    { provide: 'ASSET_PATH', useValue: ASSET_PATH }
  ],
})
export class SharedModule { }
