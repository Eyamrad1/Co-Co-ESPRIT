import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddanncollComponent } from './addanncoll.component';

describe('AddanncollComponent', () => {
  let component: AddanncollComponent;
  let fixture: ComponentFixture<AddanncollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddanncollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddanncollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
