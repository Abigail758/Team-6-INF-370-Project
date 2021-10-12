import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTenderComponent } from './list-tender.component';

describe('ListTenderComponent', () => {
  let component: ListTenderComponent;
  let fixture: ComponentFixture<ListTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
