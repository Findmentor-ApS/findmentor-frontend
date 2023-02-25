import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    component: LayoutComponent,
    loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)
  },
  { 
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
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
