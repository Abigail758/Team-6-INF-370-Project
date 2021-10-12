import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupplierTypeComponent } from './list-supplier-type.component';

describe('ListSupplierTypeComponent', () => {
  let component: ListSupplierTypeComponent;
  let fixture: ComponentFixture<ListSupplierTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSupplierTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSupplierTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
