import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrescriptionListComponent } from './pages/prescription-list/prescription-list.component';
import { PrescriptionFormComponent } from './pages/prescription-form/prescription-form.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'prescriptions', component: PrescriptionListComponent },
      { path: 'prescriptions/new', component: PrescriptionFormComponent },
      { path: 'prescriptions/:id/edit', component: PrescriptionFormComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'prescriptions' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrescriptionsRoutingModule {}
