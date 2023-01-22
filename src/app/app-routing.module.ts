import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { ProfileLayoutComponent } from './profile/profile-layout/profile-layout.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {
    path:'', pathMatch:'full',
    component: LayoutComponent,
    loadChildren:()=> import('./main/main.module').then(m=>m.MainModule)
  },
  {path: 'create-account', component: CreateAccountComponent},
  {path: 'sign-up', component:SignUpComponent},
  {
    path:'profile', 
    component: LayoutComponent,
    loadChildren:()=> import('./profile/profile.module').then(m=>m.ProfileModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
