import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { Task, TaskVirificationService } from '../../services/task-virification.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-task-verification',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './task-verification.component.html',
  styleUrls: ['./task-verification.component.css']
})
export class TaskVerificationComponent implements OnInit, OnDestroy {
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;
  tasks: Task[] = [];

  constructor(
    private themeService: ThemeService,
    public taskService: TaskVirificationService
  ) {}

  ngOnInit() {
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

  loadTasks() {
    this.taskService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks;
        console.log(this.tasks);
      },
      error => console.error('Ошибка при загрузке заданий:', error)
    );
  }

  confirmTask(completedTaskId: number) {
    this.taskService.confirmTask(completedTaskId).subscribe(
      response => {
        console.log(response.message);
        this.loadTasks();
      },
      error => {
        console.error('Ошибка при подтверждении задания:', error);
        if (error.error && error.error.detail) {
          console.error('Детали ошибки:', error.error.detail);
        }
      }
    );
  }
  
  returnTask(completedTaskId: number) {
    this.taskService.returnTask(completedTaskId).subscribe(
      response => {
        console.log(response.message);
        this.loadTasks();
      },
      error => {
        console.error('Ошибка при возврате задания:', error);
        if (error.error && error.error.detail) {
          console.error('Детали ошибки:', error.error.detail);
        }
      }
    );
  }

  getTaskImageUrl(photo: string | null): string | null {
    return photo ? this.taskService.getImageUrl(photo) : null;
  }
}