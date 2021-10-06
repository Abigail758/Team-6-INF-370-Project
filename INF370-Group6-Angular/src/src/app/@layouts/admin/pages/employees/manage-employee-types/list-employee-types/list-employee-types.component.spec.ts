import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeeTypesComponent } from './list-employee-types.component';

describe('ListEmployeeTypesComponent', () => {
  let component: ListEmployeeTypesComponent;
  let fixture: ComponentFixture<ListEmployeeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEmployeeTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
