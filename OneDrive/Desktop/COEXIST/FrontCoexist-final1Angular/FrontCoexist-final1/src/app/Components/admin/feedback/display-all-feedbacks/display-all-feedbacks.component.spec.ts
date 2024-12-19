import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllFeedbacksComponent } from './display-all-feedbacks.component';

describe('DisplayAllFeedbacksComponent', () => {
  let component: DisplayAllFeedbacksComponent;
  let fixture: ComponentFixture<DisplayAllFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAllFeedbacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAllFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
