import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhaseStatusComponent } from './add-phase-status.component';

describe('AddPhaseStatusComponent', () => {
  let component: AddPhaseStatusComponent;
  let fixture: ComponentFixture<AddPhaseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhaseStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhaseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
