import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskViewService, Task } from '../../services/task-view.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-tasks-view',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HeaderComponent],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.css'
})
export class TasksViewComponent implements OnInit, OnDestroy{
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;
  tasks: Task[] = [];

  constructor(private taskService: TaskViewService, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService.getThemeObservable().subscribe(
      isDark => {
        this.isDarkTheme = isDark;
      }
    );

    this.loadTasks();
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      tasks => this.tasks = tasks,
      error => console.error('Ошибка при загрузке заданий:', error)
    );
  }

  getTaskImageUrl(photo: string | null): string | null {
    return photo ? this.taskService.getImageUrl(photo) : null;
  }

  disableTask(taskId: number): void {
    this.taskService.disableTask(taskId).subscribe(
      response => {
        console.log(response.message);
        this.loadTasks();
      },
      error => console.error('Ошибка при отключении задания:', error)
    );
  }

  deleteTask(taskId: number): void {
    if (confirm('Вы уверены, что хотите удалить это задание?')) {
      this.taskService.deleteTask(taskId).subscribe(
        response => {
          console.log(response.message);
          this.loadTasks();
        },
        error => console.error('Ошибка при удалении задания:', error)
      );
    }
  }
}
