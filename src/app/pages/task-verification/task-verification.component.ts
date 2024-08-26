import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { Task, TaskVirificationService } from '../../services/task-virification.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-task-verification',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HeaderComponent],
  templateUrl: './task-verification.component.html',
  styleUrls: ['./task-verification.component.css']
})
export class TaskVerificationComponent implements OnInit, OnDestroy {
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';
  sortField: 'id' | 'reward' | 'limit' = 'id';
  searchText: string = '';
  selectedPlatform: string = '';

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
        this.filterTasks();
      },
      error => console.error('Ошибка при загрузке заданий:', error)
    );
  }

  toggleSortOrder(field: 'id' | 'reward' | 'limit') {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.sortTasks();
  }

  sortTasks() {
    this.filteredTasks.sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (this.sortField) {
        case 'id':
          aValue = a.task_id;
          bValue = b.task_id;
          break;
        case 'reward':
          aValue = typeof a.reward === 'string' ? parseFloat(a.reward) : a.reward;
          bValue = typeof b.reward === 'string' ? parseFloat(b.reward) : b.reward;
          break;
        case 'limit':
          aValue = a.limit ?? Infinity;
          bValue = b.limit ?? Infinity;
          break;
      }
      
      if (this.sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(task =>
      task.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedPlatform === '' || task.platform.toLowerCase() === this.selectedPlatform.toLowerCase())
    );
    this.sortTasks();
  }

  resetFilters() {
    this.searchText = '';
    this.selectedPlatform = '';
    this.sortField = 'id';
    this.sortOrder = 'asc';
    this.filterTasks();
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