import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentSelectionComponent } from './apartment-selection.component';

describe('ApartmentSelectionComponent', () => {
  let component: ApartmentSelectionComponent;
  let fixture: ComponentFixture<ApartmentSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentSelectionComponent]
    });
    fixture = TestBed.createComponent(ApartmentSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
