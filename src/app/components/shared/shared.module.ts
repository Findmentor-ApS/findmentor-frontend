import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SecondaryNavigationComponent } from './components/secondary-navigation/secondary-navigation.component';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area/text-area.component';

@NgModule({
  declarations: [
    SecondaryNavigationComponent,
    InputComponent,
    TextAreaComponent,
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
    TextAreaComponent
  ]
})
export class SharedModule { }
