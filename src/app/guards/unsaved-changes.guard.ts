import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface HasDirtyForm {
  readonly formGroup: UntypedFormGroup;
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard<T extends HasDirtyForm> implements CanDeactivate<T> {
  canDeactivate(component: T): Observable<boolean> | Promise<boolean> | boolean {
    if (component.formGroup.dirty) {
      return confirm('Du har ændringer som ikke er gemt. Er du sikker på du vil forlade siden?');
    }
    return true;
  }
}