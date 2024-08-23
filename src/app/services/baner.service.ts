import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments';

interface BannerResponse {
  message: string;
  banner_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class BanerService {
  private apiUrl = `${environment.apiUrl}/api/banners`;

  constructor(private http: HttpClient) {}

  createBanner(formData: FormData): Observable<BannerResponse> {
    return this.http.post<BannerResponse>(this.apiUrl, formData);
  }
}