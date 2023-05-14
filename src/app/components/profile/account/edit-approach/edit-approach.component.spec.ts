import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApproachComponent } from './edit-approach.component';

describe('EditApproachComponent', () => {
  let component: EditApproachComponent;
  let fixture: ComponentFixture<EditApproachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditApproachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditApproachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
