import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentOverviewComponent } from './apartment-overview.component';

describe('ApartmentOverviewComponent', () => {
  let component: ApartmentOverviewComponent;
  let fixture: ComponentFixture<ApartmentOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentOverviewComponent]
    });
    fixture = TestBed.createComponent(ApartmentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
