import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTimeOutComponent } from './account-time-out.component';

describe('AccountTimeOutComponent', () => {
  let component: AccountTimeOutComponent;
  let fixture: ComponentFixture<AccountTimeOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTimeOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTimeOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
