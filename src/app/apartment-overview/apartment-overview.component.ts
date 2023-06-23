import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment-overview',
  templateUrl: './apartment-overview.component.html',
  styleUrls: ['./apartment-overview.component.css']
})
export class ApartmentOverviewComponent {
  selectedApartment: string = '';
  password: string = '';

  constructor(private router: Router) {}

  selectApartment(apartment: string) {
    this.selectedApartment = apartment;
  }

  login() {
    if (this.password === 'xy') {
      this.router.navigate(['/apartment-selection', this.selectedApartment]);
    } else {
      alert('Invalid password. Please try again.');
    }
  }
}


