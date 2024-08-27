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
  sortField: 'id' | 'reward' | 'limit' | 'completed_task_id' = 'id';
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

  toggleSortOrder(field: 'id' | 'reward' | 'limit' | 'completed_task_id') {
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
        case 'completed_task_id':
          aValue = a.completed_task_id;
          bValue = b.completed_task_id;
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
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredTasks = this.tasks.filter(task => {
      const nameMatch = task.name.toLowerCase().includes(searchTextLower);
      const descriptionMatch = task.description.toLowerCase().includes(searchTextLower);
      const platformMatch = this.selectedPlatform === '' || 
                            task.platform.toLowerCase() === this.selectedPlatform.toLowerCase();
      
      return (nameMatch || descriptionMatch) && platformMatch;
    });
    this.sortTasks();
  }

  transliterateRussian(text: string): string {
    const ru = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const en = 'abvgdeejzijklmnoprstufhzcssyyyeua';
    return text.split('').map(char => {
      const index = ru.indexOf(char);
      return index >= 0 ? en[index] : char;
    }).join('');
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

  banUser(userId: number, completedTaskId: number) {
    if (confirm('Вы уверены, что хотите забанить этого пользователя?')) {
      // Сначала возвращаем задание
      this.taskService.returnTask(completedTaskId).subscribe(
        returnResponse => {
          console.log(returnResponse.message);
          
          // После успешного возврата задания, баним пользователя
          this.taskService.banUser(userId).subscribe(
            banResponse => {
              console.log(banResponse.message);
              alert('Задание возвращено и пользователь успешно забанен');
              this.loadTasks(); // Обновляем список заданий
            },
            banError => {
              console.error('Ошибка при бане пользователя:', banError);
              if (banError.error && banError.error.detail) {
                alert(`Ошибка при бане: ${banError.error.detail}`);
              } else {
                alert('Произошла ошибка при бане пользователя');
              }
            }
          );
        },
        returnError => {
          console.error('Ошибка при возврате задания:', returnError);
          if (returnError.error && returnError.error.detail) {
            alert(`Ошибка при возврате задания: ${returnError.error.detail}`);
          } else {
            alert('Произошла ошибка при возврате задания');
          }
        }
      );
    }
  }

  getTaskImageUrl(photo: string | null): string | null {
    return photo ? this.taskService.getImageUrl(photo) : null;
  }
}