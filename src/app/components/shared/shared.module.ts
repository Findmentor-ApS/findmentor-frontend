import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SecondaryNavigationComponent } from './components/secondary-navigation/secondary-navigation.component';
import { InputComponent } from './input/input.component';


@NgModule({
  declarations: [
    SecondaryNavigationComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    SecondaryNavigationComponent]
})
export class SharedModule { }
