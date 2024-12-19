import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyanncollComponent } from './myanncoll.component';

describe('MyanncollComponent', () => {
  let component: MyanncollComponent;
  let fixture: ComponentFixture<MyanncollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyanncollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyanncollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
