import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { TypeGuard } from './guards/type.guard';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { ProfileLayoutComponent } from './components/profile/profile-layout/profile-layout.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    component: LayoutComponent,
    loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)
  },
  { path: 'sign-up/:type', component: SignUpComponent, pathMatch: 'full', data: { allowedTypes: ['mentor', 'kommune', 'borger'] },  canActivate: [TypeGuard] },
  { path: 'login/:type', component: LoginComponent, pathMatch: 'full', data: { allowedTypes: ['mentor', 'kommune', 'borger'] },  canActivate: [TypeGuard] },
  { path: 'create-account', component: CreateAccountComponent },
  {
    path: 'profile',
    component: LayoutComponent,
    loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
