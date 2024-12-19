import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEvaluationComponent } from './display-evaluation.component';

describe('DisplayEvaluationComponent', () => {
  let component: DisplayEvaluationComponent;
  let fixture: ComponentFixture<DisplayEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
