import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaskStatusesComponent } from './list-task-statuses.component';

describe('ListTaskStatusesComponent', () => {
  let component: ListTaskStatusesComponent;
  let fixture: ComponentFixture<ListTaskStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTaskStatusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTaskStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
