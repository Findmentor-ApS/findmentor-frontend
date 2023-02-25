import { TestBed } from '@angular/core/testing';
import { UnsavedChangesGuard } from './unsaved-changes.guard';

describe('UnsavedChangesGuard', () => {
  let guard: UnsavedChangesGuard<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnsavedChangesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
