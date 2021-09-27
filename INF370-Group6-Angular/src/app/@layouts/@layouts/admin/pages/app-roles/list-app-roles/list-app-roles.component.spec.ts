import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppRolesComponent } from './list-app-roles.component';

describe('ListAppRolesComponent', () => {
  let component: ListAppRolesComponent;
  let fixture: ComponentFixture<ListAppRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
