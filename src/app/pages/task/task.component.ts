import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { TaskService } from '../../services/task.service';
import { submitTaskForm, onTaskTypeChange } from '../../functions/task.functions';
import { ModalComponent } from '../../pages/modal/modal.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent, ModalComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent) modal!: ModalComponent;

  taskForm: FormGroup;
  selectedFile: File | null = null;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;
  modalMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      taskType: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      actionName: ['', Validators.required],
      limit: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern('https?://.+')]],
      startTime: [''],
      endTime: [''],
      taskSize: ['']
    });
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.getThemeObservable().subscribe(
      isDark => {
        this.isDarkTheme = isDark;
      }
    );
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  onTaskTypeChange() {
    onTaskTypeChange(this.taskForm);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const submission = submitTaskForm(this.taskForm, this.selectedFile, this.taskService);
    if (submission) {
      submission.subscribe(
        response => {
          this.modalMessage = `Задание успешно создано с ID: ${response.id}`;
          this.modal.show();
        },
        error => {
          this.modalMessage = `Ошибка при создании задания: ${error.message}`;
          this.modal.show();
        }
      );
    }
  }
}