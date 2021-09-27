import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyrentalreportComponent } from './monthlyrentalreport.component';

describe('MonthlyrentalreportComponent', () => {
  let component: MonthlyrentalreportComponent;
  let fixture: ComponentFixture<MonthlyrentalreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyrentalreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyrentalreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
