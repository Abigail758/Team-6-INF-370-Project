import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTenderStatusComponent } from './add-tender-status.component';

describe('AddTenderStatusComponent', () => {
  let component: AddTenderStatusComponent;
  let fixture: ComponentFixture<AddTenderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTenderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTenderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
