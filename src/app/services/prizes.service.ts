import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {
  private apiUrl = '/api/farming_prizes';

  constructor(private http: HttpClient) {}

  createPrize(formData: FormData): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, formData);
  }

  uploadFile(file: File): File | null {
    return file;
  }
}