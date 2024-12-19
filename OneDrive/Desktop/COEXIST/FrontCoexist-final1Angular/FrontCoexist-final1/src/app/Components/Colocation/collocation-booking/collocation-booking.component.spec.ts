import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollocationBookingComponent } from './collocation-booking.component';

describe('CollocationBookingComponent', () => {
  let component: CollocationBookingComponent;
  let fixture: ComponentFixture<CollocationBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollocationBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollocationBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
