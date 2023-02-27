import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }

  canActivate(): boolean {
    const accessToken = this.auth.getAccessToken();
    if (accessToken === null) {
      return true;
    }
    this.router.navigate(['/profile/edit-profile']);
    return false;
  }
  
}
