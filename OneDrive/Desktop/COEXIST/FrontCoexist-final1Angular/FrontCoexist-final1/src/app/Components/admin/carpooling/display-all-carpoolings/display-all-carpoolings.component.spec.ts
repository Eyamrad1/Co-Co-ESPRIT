import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllCarpoolingsComponent } from './display-all-carpoolings.component';

describe('DisplayAllCarpoolingsComponent', () => {
  let component: DisplayAllCarpoolingsComponent;
  let fixture: ComponentFixture<DisplayAllCarpoolingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAllCarpoolingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAllCarpoolingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
