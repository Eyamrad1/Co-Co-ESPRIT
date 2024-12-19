import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllanncollComponent } from './allanncoll.component';

describe('AllanncollComponent', () => {
  let component: AllanncollComponent;
  let fixture: ComponentFixture<AllanncollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllanncollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllanncollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
