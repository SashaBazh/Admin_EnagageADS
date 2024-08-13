import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-task-verification',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './task-verification.component.html',
  styleUrl: './task-verification.component.css'
})
export class TaskVerificationComponent implements OnInit, OnDestroy {
  verificationForm: FormGroup;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;
  taskScreenshotUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService) {
    this.verificationForm = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskLink: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.getThemeObservable().subscribe(
      isDark => {
        this.isDarkTheme = isDark;
      }
    );

    // Здесь вы можете загрузить данные задания с сервера и заполнить форму
    this.loadTaskData();
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  loadTaskData() {
    // Здесь должна быть логика загрузки данных задания с сервера
    // Пример заполнения формы:
    this.verificationForm.patchValue({
      taskName: 'Название задания',
      taskDescription: 'Описание задания',
      taskLink: 'https://example.com/task'
    });
    this.taskScreenshotUrl = 'url_to_screenshot_image';
  }

  confirmTask() {
    // Логика подтверждения задания
    console.log('Задание подтверждено');
    // Здесь вы можете отправить запрос на сервер для подтверждения задания
  }

  returnTask() {
    // Логика возврата задания
    console.log('Задание возвращено');
    // Здесь вы можете отправить запрос на сервер для возврата задания
  }

  onVerificationSubmit() {
    if (this.verificationForm.valid) {
      console.log(this.verificationForm.value);
      // Здесь вы можете отправить данные на сервер, если это необходимо
    }
  }
}