import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(): boolean {
    const accessToken = this.auth.getAccessToken();
    if (accessToken) {
      return true;
    }
    this.router.navigate(['/auth/login-account']);
    return false;
  }

}