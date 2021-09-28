import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeTypeComponent } from './add-employee-type.component';

describe('AddEmployeeTypeComponent', () => {
  let component: AddEmployeeTypeComponent;
  let fixture: ComponentFixture<AddEmployeeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
