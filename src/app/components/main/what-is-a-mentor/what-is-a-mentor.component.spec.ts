import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsAMentorComponent } from './what-is-a-mentor.component';

describe('WhatIsAMentorComponent', () => {
  let component: WhatIsAMentorComponent;
  let fixture: ComponentFixture<WhatIsAMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatIsAMentorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatIsAMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
