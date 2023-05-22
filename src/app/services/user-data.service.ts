import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  setUser(user: any): void {
    this.userSubject.next(user);
  }

  getCurrentUser(): any {
    return this.userSubject.getValue();
  }

  logout(): void {
    this.userSubject.next(null);
  }
}
