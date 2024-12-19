import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollFeedbackComponent } from './coll-feedback.component';

describe('CollFeedbackComponent', () => {
  let component: CollFeedbackComponent;
  let fixture: ComponentFixture<CollFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
