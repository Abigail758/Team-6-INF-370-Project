import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhaseTasksComponent } from './list-phase-tasks.component';

describe('ListPhaseTasksComponent', () => {
  let component: ListPhaseTasksComponent;
  let fixture: ComponentFixture<ListPhaseTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPhaseTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhaseTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
