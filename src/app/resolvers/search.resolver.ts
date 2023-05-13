import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MentorService } from '../services/mentor.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResolver implements Resolve<boolean> {

  constructor(private mentorService: MentorService) {}

  resolve() {
    // Call your method here
    return this.mentorService.searchMentors(); // You will need to fill in the necessary parameters here
  }
}
