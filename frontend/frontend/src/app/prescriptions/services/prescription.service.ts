import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prescription {
  id?: number;
  prescriptionDate: string; // ISO date
  patientName: string;
  patientAge: number;
  patientGender: string;
  diagnosis: string;
  medicines: string;
  nextVisitDate?: string | null;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface DailyPrescriptionCount {
  date: string; // ISO date string
  count: number;
}

@Injectable({ providedIn: 'root' })
export class PrescriptionService {
  private readonly baseUrl = 'http://localhost:8080/API/v1/prescription';

  constructor(private http: HttpClient) {}

  getList(
    startDate?: string,
    endDate?: string
  ): Observable<Prescription[]> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    return this.http.get<Prescription[]>(this.baseUrl, { params });
  }

  getPaged(
    startDate: string,
    endDate: string,
    page: number,
    size: number
  ): Observable<PageResponse<Prescription>> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<Prescription>>(`${this.baseUrl}/page`, {
      params,
    });
  }

  getById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${this.baseUrl}/${id}`);
  }

  create(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.baseUrl, prescription);
  }

  update(id: number, prescription: Prescription): Observable<Prescription> {
    return this.http.put<Prescription>(`${this.baseUrl}/${id}`, prescription);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getDailyReport(
    endDate: string,
    days: number = 10
  ): Observable<DailyPrescriptionCount[]> {
    let params = new HttpParams().set('days', days);
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    return this.http.get<DailyPrescriptionCount[]>(`${this.baseUrl}/report/daily`, {
      params,
    });
  }
}
