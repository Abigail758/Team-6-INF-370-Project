import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectprogressreportComponent } from './projectprogressreport.component';

describe('ProjectprogressreportComponent', () => {
  let component: ProjectprogressreportComponent;
  let fixture: ComponentFixture<ProjectprogressreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectprogressreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectprogressreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
