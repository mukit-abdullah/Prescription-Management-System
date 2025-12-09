import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Prescription,
  PrescriptionService,
} from '../../services/prescription.service';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.scss'],
})
export class PrescriptionFormComponent implements OnInit {
  isEditMode = false;
  isSubmitting = false;

  form = this.fb.group({
    prescriptionDate: ['', Validators.required],
    patientName: ['', Validators.required],
    patientAge: [null as number | null, [Validators.required, Validators.min(0), Validators.max(120)]],
    patientGender: ['', Validators.required],
    diagnosis: ['', Validators.required],
    medicines: ['', Validators.required],
    nextVisitDate: [''],
  });

  private currentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: PrescriptionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.currentId = Number(idParam);
      this.loadPrescription(this.currentId);
    } else {
      const today = new Date().toISOString().substring(0, 10);
      this.form.patchValue({ prescriptionDate: today });
    }
  }

  loadPrescription(id: number): void {
    this.service.getById(id).subscribe({
      next: (p: Prescription) => {
        this.form.patchValue({
          prescriptionDate: p.prescriptionDate,
          patientName: p.patientName,
          patientAge: p.patientAge,
          patientGender: p.patientGender,
          diagnosis: p.diagnosis,
          medicines: p.medicines,
          nextVisitDate: p.nextVisitDate || '',
        });
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value as Prescription;

    this.isSubmitting = true;

    let request$;
    if (this.isEditMode && this.currentId != null) {
      request$ = this.service.update(this.currentId, value);
    } else {
      request$ = this.service.create(value);
    }

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/prescriptions']);
      },
      error: () => {
        this.isSubmitting = false;
      },
    });
  }
}
