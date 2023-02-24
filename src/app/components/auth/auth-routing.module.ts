import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout/layout.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TypeGuard } from '../../guards/type.guard';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginAccountComponent } from './login-account/login-account.component';
import { ValidateLoginComponent } from './validate-login/validate-login.component';
import { ValidateEmailComponent } from './validate-email/validate-email.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'create-account', pathMatch: 'full' },
            { path: 'create-account', component: CreateAccountComponent},
            { path: 'login-account', component: LoginAccountComponent},
            { path: 'sign-up/:type', component: SignUpComponent, data: { allowedTypes: ['mentor', 'kommune', 'borger'] },  canActivate: [TypeGuard] },
            { path: 'login/:type', component: LoginComponent, data: { allowedTypes: ['mentor', 'kommune', 'borger'] },  canActivate: [TypeGuard] }, 
            { path: 'validate_login/:type/:login_token', component: ValidateLoginComponent, data: { allowedTypes: ['mentor', 'kommune', 'borger'] },  canActivate: [TypeGuard] }, 
            { path: 'validate_email/:type/:verify_email_token', component: ValidateEmailComponent, data: { allowedTypes: ['mentor', 'kommune', 'borger'] },  canActivate: [TypeGuard] }, 
        ]
    }
    // {path: '', redirectTo:'home' ,pathMatch:'full' },
    // { path: 'home', component:  HomeComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
