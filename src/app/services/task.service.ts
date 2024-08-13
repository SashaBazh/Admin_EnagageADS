import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskResponse } from '../functions/task.functions';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  createTask(formData: FormData): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.apiUrl, formData);
  }
}