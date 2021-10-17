import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteProjectsComponent } from './complete-projects.component';

describe('CompleteProjectsComponent', () => {
  let component: CompleteProjectsComponent;
  let fixture: ComponentFixture<CompleteProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
