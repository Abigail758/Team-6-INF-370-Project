import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectStatusComponent } from './update-project-status.component';

describe('UpdateProjectStatusComponent', () => {
  let component: UpdateProjectStatusComponent;
  let fixture: ComponentFixture<UpdateProjectStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProjectStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProjectStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
