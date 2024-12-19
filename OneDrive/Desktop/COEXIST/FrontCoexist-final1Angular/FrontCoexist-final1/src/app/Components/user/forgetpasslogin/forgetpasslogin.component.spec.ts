import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpassloginComponent } from './forgetpasslogin.component';

describe('ForgetpassloginComponent', () => {
  let component: ForgetpassloginComponent;
  let fixture: ComponentFixture<ForgetpassloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetpassloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetpassloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
