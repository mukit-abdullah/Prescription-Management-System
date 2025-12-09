import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  PageResponse,
  Prescription,
  PrescriptionService,
} from '../../services/prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.scss'],
})
export class PrescriptionListComponent implements OnInit {
  filterForm: FormGroup;
  prescriptions: Prescription[] = [];
  loading = false;

  pageIndex = 0;
  pageSize = 10;
  totalElements = 0;
  pageSizeOptions = [5, 10, 20, 50];

  deleteTarget: Prescription | null = null;

  constructor(
    private fb: FormBuilder,
    private service: PrescriptionService,
    private router: Router
  ) {
    const { start, end } = this.getCurrentMonthRange();
    this.filterForm = this.fb.group({
      startDate: [start],
      endDate: [end],
      pageSize: [this.pageSize],
    });
  }

  ngOnInit(): void {
    this.loadPage();
  }

  getCurrentMonthRange(): { start: string; end: string } {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const toIsoDate = (d: Date) => d.toISOString().substring(0, 10);

    return { start: toIsoDate(start), end: toIsoDate(end) };
  }

  onFilterChange(): void {
    this.pageIndex = 0;
    this.pageSize = this.filterForm.value.pageSize || this.pageSize;
    this.loadPage();
  }

  loadPage(): void {
    const { startDate, endDate, pageSize } = this.filterForm.value;
    if (!startDate || !endDate) {
      return;
    }

    this.loading = true;
    this.pageSize = pageSize || this.pageSize;

    this.service
      .getPaged(startDate, endDate, this.pageIndex, this.pageSize)
      .subscribe({
        next: (page: PageResponse<Prescription>) => {
          this.prescriptions = page.content;
          this.totalElements = page.totalElements;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  changePage(delta: number): void {
    const totalPages = Math.ceil(this.totalElements / this.pageSize) || 1;
    const newIndex = this.pageIndex + delta;
    if (newIndex < 0 || newIndex >= totalPages) {
      return;
    }
    this.pageIndex = newIndex;
    this.loadPage();
  }

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.pageSize) || 1;
  }

  newPrescription(): void {
    this.router.navigate(['/prescriptions/new']);
  }

  editPrescription(p: Prescription): void {
    if (!p.id) {
      return;
    }
    this.router.navigate(['/prescriptions', p.id, 'edit']);
  }

  confirmDelete(p: Prescription): void {
    this.deleteTarget = p;
  }

  cancelDelete(): void {
    this.deleteTarget = null;
  }

  deleteConfirmed(): void {
    if (!this.deleteTarget || this.deleteTarget.id == null) {
      return;
    }
    this.service.delete(this.deleteTarget.id).subscribe({
      next: () => {
        this.deleteTarget = null;
        this.loadPage();
      },
      error: () => {
        this.deleteTarget = null;
      },
    });
  }
}
