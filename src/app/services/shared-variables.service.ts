import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedVariablesService {
  isAvailable$ = new BehaviorSubject<boolean>(false);
  private profileDeletedSource = new Subject<boolean>();
  profileDeleted$ = this.profileDeletedSource.asObservable();

  constructor() { }

  profileDeleted() {
    this.profileDeletedSource.next(true);
  }
}


