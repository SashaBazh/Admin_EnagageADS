import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments';

export interface Order {
  order_id: number;
  user_id: number;
  service: {
    service_id: number;
    service_name: string;
    price: number;
  };
  status: string;
  created_at: string;
}

export interface UpdateStatusPayload {
  order_id: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceAssignmentsService {

  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    const url = `${this.apiUrl}/services`;
    return this.http.get<Order[]>(url);
  }

  // Обновление статуса заказа
  updateOrderStatus(payload: UpdateStatusPayload): Observable<{ message: string }> {
    const url = `${this.apiUrl}/order/status`;
    return this.http.post<{ message: string }>(url, payload);
  }
}
