import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentOverviewComponent } from './apartment-overview/apartment-overview.component';
import { ApartmentSelectionComponent } from './apartment-selection/apartment-selection.component';

const routes: Routes = [
  { path: '', redirectTo: '/apartment-overview', pathMatch: 'full' },
  { path: 'apartment-overview', component: ApartmentOverviewComponent },
  { path: 'apartment-selection/:id', component: ApartmentSelectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
