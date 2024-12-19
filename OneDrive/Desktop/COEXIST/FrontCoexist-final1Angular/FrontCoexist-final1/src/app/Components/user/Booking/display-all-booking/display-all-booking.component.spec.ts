import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllBookingComponent } from './display-all-booking.component';

describe('DisplayAllBookingComponent', () => {
  let component: DisplayAllBookingComponent;
  let fixture: ComponentFixture<DisplayAllBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAllBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAllBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
