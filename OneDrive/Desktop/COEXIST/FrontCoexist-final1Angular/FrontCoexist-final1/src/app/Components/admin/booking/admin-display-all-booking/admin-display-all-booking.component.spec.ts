import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDisplayAllBookingComponent } from './admin-display-all-booking.component';

describe('AdminDisplayAllBookingComponent', () => {
  let component: AdminDisplayAllBookingComponent;
  let fixture: ComponentFixture<AdminDisplayAllBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDisplayAllBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDisplayAllBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
