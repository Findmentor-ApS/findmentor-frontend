import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlivMentorComponent } from './bliv-mentor.component';

describe('BlivMentorComponent', () => {
    let component: BlivMentorComponent;
    let fixture: ComponentFixture<BlivMentorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BlivMentorComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BlivMentorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
