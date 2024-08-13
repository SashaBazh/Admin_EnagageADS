import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = '/api/system_settings';

  constructor(private http: HttpClient) {}

  applySettings(settings: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, settings);
  }
}