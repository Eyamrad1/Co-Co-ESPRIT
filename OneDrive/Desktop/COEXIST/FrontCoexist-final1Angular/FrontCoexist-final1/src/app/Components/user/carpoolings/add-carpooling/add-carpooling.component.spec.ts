import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarpoolingComponent } from './add-carpooling.component';

describe('AddCarpoolingComponent', () => {
  let component: AddCarpoolingComponent;
  let fixture: ComponentFixture<AddCarpoolingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCarpoolingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarpoolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
