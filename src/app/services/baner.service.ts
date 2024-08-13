
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanerService {

  private apiUrl = '/api/banners';

  constructor(private http: HttpClient) {}

  createBanner(formData: FormData): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, formData);
  }
}
