import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhaseTaskComponent } from './add-phase-task.component';

describe('AddPhaseTaskComponent', () => {
  let component: AddPhaseTaskComponent;
  let fixture: ComponentFixture<AddPhaseTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhaseTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhaseTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
