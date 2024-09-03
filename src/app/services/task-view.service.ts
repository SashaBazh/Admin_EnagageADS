import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments';

export interface Task {
  id: number; // исправлено с completed_task_id
  name: string;
  description: string;
  reward: number;
  photo: string | null; // исправлено с proof_photo
  platform: string | null;
  link: string | null;
  limit: number | null;
  start_time: string | null;
  end_time: string | null;
  task_size: string | null;
  ended: boolean;
  daily_task?: {
    task_size: string;
    start_time: string;
    end_time: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TaskViewService {

  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  // Получение всех заданий
  // Получение всех заданий
  getAllTasks(): Observable<Task[]> {
    const url = `${this.apiUrl}/system-tasks`; // исправлено на правильный эндпоинт
    return this.http.post<Task[]>(url, {}); // Используем POST запрос с пустым телом
  }

  getImageUrl(imagePath: string): string {
    const path = imagePath.startsWith('http') ? imagePath : `${this.apiUrl}/image?image_path=${encodeURIComponent(imagePath)}`;
    return path;
  }


  // Отключение задания (установка ended в true)
  disableTask(taskId: number): Observable<{ message: string }> {
    const url = `${this.apiUrl}/system-task/off`;
    const params = new HttpParams().set('task_id', taskId.toString());
    
    return this.http.patch<{ message: string }>(url, null, { params });
  }

  // Удаление задания и связанных с ним completed tasks
  deleteTask(taskId: number): Observable<{ message: string }> {
    const url = `${this.apiUrl}/system-tasks/${taskId}`; // исправлено на правильный эндпоинт
    return this.http.delete<{ message: string }>(url);
  }
}
