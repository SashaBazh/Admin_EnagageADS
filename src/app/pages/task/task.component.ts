import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { TaskService } from '../../services/task.service';
import { ModalComponent } from '../../pages/modal/modal.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent, ModalComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
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
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]], 
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
    const taskType = this.taskForm.get('taskType')?.value;
    if (taskType === 'daily') {
      this.taskForm.get('startTime')?.setValidators([Validators.required]);
      this.taskForm.get('endTime')?.setValidators([Validators.required]);
      this.taskForm.get('taskSize')?.setValidators([Validators.required]);
    } else {
      this.taskForm.get('startTime')?.clearValidators();
      this.taskForm.get('endTime')?.clearValidators();
      this.taskForm.get('taskSize')?.clearValidators();
    }
    this.taskForm.get('startTime')?.updateValueAndValidity();
    this.taskForm.get('endTime')?.updateValueAndValidity();
    this.taskForm.get('taskSize')?.updateValueAndValidity();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];  
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = new FormData(); 
      const isDaily = this.taskForm.get('taskType')?.value === 'daily';

      formData.append('name', this.taskForm.get('title')?.value);
      formData.append('reward', this.taskForm.get('price')?.value);
      formData.append('platform', this.taskForm.get('category')?.value);
      formData.append('limit', this.taskForm.get('limit')?.value);
      formData.append('description', this.taskForm.get('description')?.value);
      formData.append('link', this.taskForm.get('link')?.value);

      if (this.selectedFile) {
        formData.append('photo', this.selectedFile); 
      }

      if (isDaily) {
        formData.append('start_time', this.taskForm.get('startTime')?.value);
        formData.append('end_time', this.taskForm.get('endTime')?.value);
        formData.append('task_size', this.taskForm.get('taskSize')?.value);
      }
      this.taskService.createTask(formData, isDaily).subscribe(
        response => {
          this.modalMessage = response.message;
          this.modal.show(); 
          this.taskForm.reset();  
          this.selectedFile = null; 
        },
        error => {
          this.modalMessage = `Ошибка при создании задания: ${error.message}`;
          this.modal.show();
        }
      );
    } else {
      this.modalMessage = 'Пожалуйста, заполните все обязательные поля';
      this.modal.show();
    }
  }
}
