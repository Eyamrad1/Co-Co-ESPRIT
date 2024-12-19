import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationEventComponent } from './reservation-event.component';

describe('ReservationEventComponent', () => {
  let component: ReservationEventComponent;
  let fixture: ComponentFixture<ReservationEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
