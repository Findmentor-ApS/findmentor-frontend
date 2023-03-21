import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { MentorService } from '../services/mentor.service';

@Injectable({
  providedIn: 'root'
})
export class MentorResolver implements Resolve<boolean> {

  constructor(private mentorService: MentorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    const mentorId = route.paramMap.get('id');
    return this.mentorService.getMentor(mentorId).pipe(
      map(response => {
        return response;
      }),
      catchError(error => of(null))
    );
  }
}
