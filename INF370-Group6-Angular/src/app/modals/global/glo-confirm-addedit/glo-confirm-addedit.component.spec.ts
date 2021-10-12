import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GloConfirmAddeditComponent } from './glo-confirm-addedit.component';

describe('GloConfirmAddeditComponent', () => {
  let component: GloConfirmAddeditComponent;
  let fixture: ComponentFixture<GloConfirmAddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GloConfirmAddeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GloConfirmAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
