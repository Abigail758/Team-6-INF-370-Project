import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAppRoleComponent } from './delete-app-role.component';

describe('DeleteAppRoleComponent', () => {
  let component: DeleteAppRoleComponent;
  let fixture: ComponentFixture<DeleteAppRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAppRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAppRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
