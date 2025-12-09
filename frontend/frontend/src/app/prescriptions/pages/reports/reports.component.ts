import { Component, OnInit } from '@angular/core';
import { DailyPrescriptionCount, PrescriptionService } from '../../services/prescription.service';

interface ChartDatum {
  name: string;
  value: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  selectedDate: string;
  loading = false;
  data: ChartDatum[] = [];

  view: [number, number] = [700, 400];

  xAxis = true;
  yAxis = true;
  legend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Prescription Count';

  colorScheme = 'vivid';

  constructor(private service: PrescriptionService) {
    const today = new Date().toISOString().substring(0, 10);
    this.selectedDate = today;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.service.getDailyReport(this.selectedDate, 10).subscribe({
      next: (rows: DailyPrescriptionCount[]) => {
        this.data = rows.map((r) => ({
          name: r.date,
          value: r.count,
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onDateChange(): void {
    this.loadData();
  }
}
