import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments';

export interface Task {
  completed_task_id: number;
  task_id: number;
  name: string;
  description: string;
  reward: number;
  proof_photo: string | null;
  platform: string;
  user_id: number;
  link: string | null;
  limit: number | null;
  start_time: string | null;
  end_time: string | null;
  task_size: string | null;
  social_link: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TaskVirificationService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const url = `${this.apiUrl}/tasks`;
    return this.http.get<Task[]>(url);
  }

  confirmTask(completedTaskId: number): Observable<{ message: string }> {
    const url = `${this.apiUrl}/tasks/verify`;
    const params = new HttpParams().set('completed_task_id', completedTaskId.toString());
    return this.http.post<{ message: string }>(url, null, { params });
  }

  returnTask(completedTaskId: number): Observable<{ message: string }> {
    const url = `${this.apiUrl}/tasks/return`;
    const params = new HttpParams().set('completed_task_id', completedTaskId.toString());
    return this.http.post<{ message: string }>(url, null, { params });
  }

  banUser(userId: number): Observable<{ message: string }> {
    const url = `${this.apiUrl}/ban-user`;
    const formData = new FormData();
    formData.append('user_id', userId.toString());
    return this.http.post<{ message: string }>(url, formData);
  }

  getImageUrl(imagePath: string): string {
    const path = imagePath.startsWith('http') ? imagePath : `${this.apiUrl}/image?image_path=${encodeURIComponent(imagePath)}`;
    return path;
  }
}