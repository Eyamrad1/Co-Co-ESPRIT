import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnncollarchiveComponent } from './anncollarchive.component';

describe('AnncollarchiveComponent', () => {
  let component: AnncollarchiveComponent;
  let fixture: ComponentFixture<AnncollarchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnncollarchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnncollarchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
