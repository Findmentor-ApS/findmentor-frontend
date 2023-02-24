import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ProfileService } from '../services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<any> {

  constructor(private profileService: ProfileService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.profileService.getProfile().pipe(
      map(response => {
        return response;
      }),
      catchError(error => of(null))
    );
  }
}
