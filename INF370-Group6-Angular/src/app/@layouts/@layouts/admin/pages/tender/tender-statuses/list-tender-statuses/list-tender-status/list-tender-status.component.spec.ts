import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTenderStatusComponent } from './list-tender-status.component';

describe('ListTenderStatusComponent', () => {
  let component: ListTenderStatusComponent;
  let fixture: ComponentFixture<ListTenderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTenderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTenderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
