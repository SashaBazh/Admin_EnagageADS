import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class PayoutsService {
  private apiUrl = `${environment.apiUrl}/api/payouts`;

  constructor(private http: HttpClient) { }

  getCurrentPayouts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  
}