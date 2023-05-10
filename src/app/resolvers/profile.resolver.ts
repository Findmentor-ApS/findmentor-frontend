import { UserDataService } from 'src/app/services/user-data.service';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class ProfileResolver implements Resolve<any> {
  constructor(private profileService: ProfileService, private userDataService: UserDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.userDataService.getUser().pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          // If user data is already cached, return it
          return of(user);
        } else {
          // If user data is not cached, load it and cache it
          return this.profileService.getProfile().pipe(
            tap((loadedUser) => {
              this.userDataService.setUser(loadedUser);
            })
          );
        }
      })
    );
  }
}
