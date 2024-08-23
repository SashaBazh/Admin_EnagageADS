// в файле src/app/services/settings.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsData, SettingsResponse } from '../functions/settings.functions';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = `${environment.apiUrl}/api/system-settings`;

  constructor(private http: HttpClient) {}

  getSettings(): Observable<SettingsResponse[]> {
    return this.http.get<SettingsResponse[]>(this.apiUrl);
  }

  applySettings(name: string, settings: SettingsData): Observable<{ message: string }> {
    const payload = {
      name: name,
      value: settings
    };
    return this.http.post<{ message: string }>(this.apiUrl, payload);
  }
}