import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountdetailsComponent } from './acountdetails.component';

describe('AcountdetailsComponent', () => {
  let component: AcountdetailsComponent;
  let fixture: ComponentFixture<AcountdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcountdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcountdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
