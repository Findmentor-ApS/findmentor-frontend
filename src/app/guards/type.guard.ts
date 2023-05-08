import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TypeGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedTypes = route.data['allowedTypes'];
    const type = route.paramMap.get('type');
    if (allowedTypes.indexOf(type) !== -1 || allowedTypes.indexOf(localStorage.getItem('type')) !== -1) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}