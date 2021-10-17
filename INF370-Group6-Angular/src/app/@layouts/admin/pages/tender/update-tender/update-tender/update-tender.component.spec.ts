import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTenderComponent } from './update-tender.component';

describe('UpdateTenderComponent', () => {
  let component: UpdateTenderComponent;
  let fixture: ComponentFixture<UpdateTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
