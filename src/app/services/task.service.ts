import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}


  // Метод для создания задачи
  createTask(formData: FormData, isDaily: boolean): Observable<{ message: string }> {
    // Поскольку задачи объединены, используем один endpoint для создания задачи
    return this.http.post<{ message: string }>(`${this.apiUrl}/tasks`, formData);
  }
}
