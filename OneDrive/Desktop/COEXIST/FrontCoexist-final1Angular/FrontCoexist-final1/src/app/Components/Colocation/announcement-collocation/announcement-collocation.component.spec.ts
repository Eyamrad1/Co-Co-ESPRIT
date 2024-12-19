import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementCollocationComponent } from './announcement-collocation.component';

describe('AnnouncementCollocationComponent', () => {
  let component: AnnouncementCollocationComponent;
  let fixture: ComponentFixture<AnnouncementCollocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementCollocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementCollocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
