import { TestBed } from '@angular/core/testing';

import { MentorResolver } from './mentor.resolver';

describe('MentorResolver', () => {
  let resolver: MentorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MentorResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
