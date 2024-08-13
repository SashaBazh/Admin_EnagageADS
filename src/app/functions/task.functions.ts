import { FormGroup } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs';

export interface TaskResponse {
  id: number;
}

export function createTaskFormData(taskForm: FormGroup, selectedFile: File | null): FormData {
  const formData = new FormData();
  formData.append('name', taskForm.get('title')?.value);
  formData.append('price', taskForm.get('price')?.value);
  formData.append('action_name', taskForm.get('actionName')?.value);
  formData.append('limit', taskForm.get('limit')?.value);
  formData.append('category', taskForm.get('category')?.value);
  formData.append('link', taskForm.get('link')?.value);
  formData.append('type', taskForm.get('taskType')?.value);

  if (taskForm.get('taskType')?.value === 'daily') {
    formData.append('start_time', taskForm.get('startTime')?.value);
    formData.append('end_time', taskForm.get('endTime')?.value);
  }

  if (selectedFile) {
    formData.append('image', selectedFile);
  }

  return formData;
}

export function submitTaskForm(taskForm: FormGroup, selectedFile: File | null, taskService: TaskService): Observable<TaskResponse> | null {
  if (taskForm.valid) {
    const formData = createTaskFormData(taskForm, selectedFile);
    return taskService.createTask(formData);
  } else {
    console.log('Форма невалидна');
    return null;
  }
}

export function onTaskTypeChange(taskForm: FormGroup) {
  const taskType = taskForm.get('taskType')?.value;
  if (taskType === 'daily') {
    taskForm.get('startTime')?.setValidators([]);
    taskForm.get('endTime')?.setValidators([]);
    taskForm.get('taskSize')?.setValidators([]);
  } else {
    taskForm.get('startTime')?.clearValidators();
    taskForm.get('endTime')?.clearValidators();
    taskForm.get('taskSize')?.clearValidators();
  }
  taskForm.get('startTime')?.updateValueAndValidity();
  taskForm.get('endTime')?.updateValueAndValidity();
  taskForm.get('taskSize')?.updateValueAndValidity();
}