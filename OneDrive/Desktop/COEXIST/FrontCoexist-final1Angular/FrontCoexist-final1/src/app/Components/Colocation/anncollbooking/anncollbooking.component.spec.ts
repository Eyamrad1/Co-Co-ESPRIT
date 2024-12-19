import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnncollbookingComponent } from './anncollbooking.component';

describe('AnncollbookingComponent', () => {
  let component: AnncollbookingComponent;
  let fixture: ComponentFixture<AnncollbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnncollbookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnncollbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
