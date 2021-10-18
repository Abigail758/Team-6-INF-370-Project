import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubcontractorsComponent } from './list-subcontractors.component';

describe('ListPhasesComponent', () => {
  let component: ListSubcontractorsComponent;
  let fixture: ComponentFixture<ListSubcontractorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubcontractorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubcontractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
