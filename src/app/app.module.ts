import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components//layout/footer/footer.component';
import { MainModule } from './components//main/main.module';
import { LayoutComponent } from './components//layout/layout/layout.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ProfileModule } from './components//profile/profile.module';
import { APIInterceptor } from './services/http-interceptor.interceptor';
import { SharedModule } from './components/shared/shared.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MainModule,
    ProfileModule,
    SharedModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
