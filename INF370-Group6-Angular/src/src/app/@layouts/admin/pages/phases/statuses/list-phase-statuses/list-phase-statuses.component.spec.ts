import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhaseStatusesComponent } from './list-phase-statuses.component';

describe('ListPhaseStatusesComponent', () => {
  let component: ListPhaseStatusesComponent;
  let fixture: ComponentFixture<ListPhaseStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPhaseStatusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhaseStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
