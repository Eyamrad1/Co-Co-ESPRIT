import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayallCarpoolingsComponent } from './displayall-carpoolings.component';

describe('DisplayallCarpoolingsComponent', () => {
  let component: DisplayallCarpoolingsComponent;
  let fixture: ComponentFixture<DisplayallCarpoolingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayallCarpoolingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayallCarpoolingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
