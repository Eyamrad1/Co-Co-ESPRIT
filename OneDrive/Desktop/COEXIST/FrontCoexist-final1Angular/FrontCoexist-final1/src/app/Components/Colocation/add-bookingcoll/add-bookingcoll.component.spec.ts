import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingcollComponent } from './add-bookingcoll.component';

describe('AddBookingcollComponent', () => {
  let component: AddBookingcollComponent;
  let fixture: ComponentFixture<AddBookingcollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookingcollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookingcollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
