import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalRequestStatusComponent } from './rental-request-status.component';

describe('RentalRequestStatusComponent', () => {
  let component: RentalRequestStatusComponent;
  let fixture: ComponentFixture<RentalRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalRequestStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
