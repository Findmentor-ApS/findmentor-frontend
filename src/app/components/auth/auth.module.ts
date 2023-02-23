import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from 'src/app/services/http-interceptor.interceptor';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginAccountComponent } from './login-account/login-account.component';
import { ValidateLoginComponent } from './validate-login/validate-login.component';

@NgModule({
  declarations: [
    // FindMentorComponent,
    // MentorListComponent,
    // HomeComponent,
    // BlivMentorComponent,
    // WhatIsAMentorComponent,
    // MentorDetailComponent,
    // OverviewComponent
    SignUpComponent,
    LoginComponent,
    CreateAccountComponent,
    LoginAccountComponent,
    ValidateLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgSelectModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }
  ],
})
export class AuthModule { }
