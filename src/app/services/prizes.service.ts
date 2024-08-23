import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {
  private apiUrl = `${environment.apiUrl}/api/prizes`;

  constructor(private http: HttpClient) {}

  createPrize(formData: FormData): Observable<{ message: string; prize_id: number }> {
    return this.http.post<{ message: string; prize_id: number }>(this.apiUrl, formData);
  }
}