import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhasesComponent } from './list-phases.component';

describe('ListPhasesComponent', () => {
  let component: ListPhasesComponent;
  let fixture: ComponentFixture<ListPhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPhasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
