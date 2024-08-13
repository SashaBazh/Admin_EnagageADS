import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailingsService {
  private apiUrl = '/api/mailing';

  constructor(private http: HttpClient) {}

  createMailing(mailingData: FormData): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, mailingData);
  }
}