import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalConfirmDeletionComponent } from './global-confirm-deletion.component';

describe('GlobalConfirmDeletionComponent', () => {
  let component: GlobalConfirmDeletionComponent;
  let fixture: ComponentFixture<GlobalConfirmDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalConfirmDeletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalConfirmDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
