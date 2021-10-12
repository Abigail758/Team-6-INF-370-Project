import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractoreportComponent } from './subcontractoreport.component';

describe('SubcontractoreportComponent', () => {
  let component: SubcontractoreportComponent;
  let fixture: ComponentFixture<SubcontractoreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractoreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractoreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
