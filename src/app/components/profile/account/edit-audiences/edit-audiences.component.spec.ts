import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAudiencesComponent } from './edit-audiences.component';

describe('EditAudiencesComponent', () => {
  let component: EditAudiencesComponent;
  let fixture: ComponentFixture<EditAudiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAudiencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAudiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
