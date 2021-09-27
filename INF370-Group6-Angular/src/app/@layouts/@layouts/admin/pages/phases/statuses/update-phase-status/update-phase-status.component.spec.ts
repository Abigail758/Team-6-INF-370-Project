import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhaseStatusComponent } from './update-phase-status.component';

describe('UpdatePhaseStatusComponent', () => {
  let component: UpdatePhaseStatusComponent;
  let fixture: ComponentFixture<UpdatePhaseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhaseStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePhaseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
