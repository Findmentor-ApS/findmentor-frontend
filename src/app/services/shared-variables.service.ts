import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedVariablesService {
  isAvailable$ = new BehaviorSubject<boolean>(false);

  constructor() { }
}
