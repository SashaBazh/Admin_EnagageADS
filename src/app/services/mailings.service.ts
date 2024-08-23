import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class MailingsService {
  private apiUrl = `${environment.apiUrl}/api/mailing`;

  constructor(private http: HttpClient) {}

  createMailing(formData: FormData): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, formData);
  }
}
