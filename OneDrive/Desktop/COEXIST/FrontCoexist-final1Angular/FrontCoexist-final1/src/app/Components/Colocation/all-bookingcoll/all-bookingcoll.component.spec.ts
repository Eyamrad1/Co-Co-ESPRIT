import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookingcollComponent } from './all-bookingcoll.component';

describe('AllBookingcollComponent', () => {
  let component: AllBookingcollComponent;
  let fixture: ComponentFixture<AllBookingcollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBookingcollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBookingcollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
