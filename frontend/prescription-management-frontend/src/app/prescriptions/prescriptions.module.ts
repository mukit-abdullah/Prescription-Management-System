import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PrescriptionsRoutingModule } from './prescriptions-routing.module';
import { PrescriptionListComponent } from './pages/prescription-list/prescription-list.component';
import { PrescriptionFormComponent } from './pages/prescription-form/prescription-form.component';
import { ReportsComponent } from './pages/reports/reports.component';

@NgModule({
  declarations: [
    PrescriptionListComponent,
    PrescriptionFormComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxChartsModule,
    PrescriptionsRoutingModule,
  ],
})
export class PrescriptionsModule {}
