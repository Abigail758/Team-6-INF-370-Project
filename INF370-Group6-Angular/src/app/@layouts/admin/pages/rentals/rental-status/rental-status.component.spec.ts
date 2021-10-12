import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalStatusComponent } from './rental-status.component';

describe('RentalStatusComponent', () => {
  let component: RentalStatusComponent;
  let fixture: ComponentFixture<RentalStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
