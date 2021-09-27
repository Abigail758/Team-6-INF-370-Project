import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubcontractorComponent } from './update-subcontractors.component';

describe('UpdatePhaseComponent', () => {
  let component: UpdateSubcontractorComponent;
  let fixture: ComponentFixture<UpdateSubcontractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubcontractorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubcontractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});