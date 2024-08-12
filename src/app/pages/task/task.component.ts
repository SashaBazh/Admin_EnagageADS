import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit, OnDestroy {
  taskForm: FormGroup;
  selectedFile: File | null = null;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService) {
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
      this.taskForm.get('startTime')?.setValidators(Validators.required);
      this.taskForm.get('endTime')?.setValidators(Validators.required);
      this.taskForm.get('taskSize')?.setValidators(Validators.required);
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
    const file = event.target.files[0];
    // Здесь вы можете обработать загрузку файла
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      // Здесь вы можете отправить данные на сервер
    }
  }
}