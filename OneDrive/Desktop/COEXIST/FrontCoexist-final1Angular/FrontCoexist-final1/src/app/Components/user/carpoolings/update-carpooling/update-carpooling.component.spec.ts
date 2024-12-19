import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarpoolingComponent } from './update-carpooling.component';

describe('UpdateCarpoolingComponent', () => {
  let component: UpdateCarpoolingComponent;
  let fixture: ComponentFixture<UpdateCarpoolingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCarpoolingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCarpoolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
