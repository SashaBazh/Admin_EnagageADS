import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayoutsService {
  private apiUrl = '/api/payouts';

  constructor(private http: HttpClient) { }

  getPayoutReport(startDate: string, endDate: string): Observable<Blob> {
    const params = new HttpParams()
      .set('start_date', startDate)
      .set('end_date', endDate);

    return this.http.get(`${this.apiUrl}/report`, {
      params: params,
      responseType: 'blob'
    });
  }

  getCurrentPayouts(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/current`, {
      responseType: 'blob'
    });
  }
}