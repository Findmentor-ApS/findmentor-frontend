import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MainModule } from './main/main.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileModule } from './profile/profile.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreateAccountComponent,
    LayoutComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MainModule,
    ProfileModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
