import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectStatusesComponent } from './list-project-statuses.component';

describe('ListProjectStatusesComponent', () => {
  let component: ListProjectStatusesComponent;
  let fixture: ComponentFixture<ListProjectStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProjectStatusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjectStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
