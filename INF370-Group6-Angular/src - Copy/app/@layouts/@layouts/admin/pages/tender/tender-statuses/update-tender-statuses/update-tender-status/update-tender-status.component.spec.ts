import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTenderStatusComponent } from './update-tender-status.component';

describe('UpdateTenderStatusComponent', () => {
  let component: UpdateTenderStatusComponent;
  let fixture: ComponentFixture<UpdateTenderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTenderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTenderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
