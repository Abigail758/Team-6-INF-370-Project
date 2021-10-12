import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhaseTaskComponent } from './update-phase-task.component';

describe('UpdatePhaseTaskComponent', () => {
  let component: UpdatePhaseTaskComponent;
  let fixture: ComponentFixture<UpdatePhaseTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhaseTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePhaseTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
