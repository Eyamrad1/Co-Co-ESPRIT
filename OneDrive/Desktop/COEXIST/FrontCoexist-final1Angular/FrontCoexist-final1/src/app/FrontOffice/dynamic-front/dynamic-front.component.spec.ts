import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFrontComponent } from './dynamic-front.component';

describe('DynamicFrontComponent', () => {
  let component: DynamicFrontComponent;
  let fixture: ComponentFixture<DynamicFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
