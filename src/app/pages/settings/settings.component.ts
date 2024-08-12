import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      rankSystem: ['', Validators.required],
      rankThresholds: ['', Validators.required],
      farmingSpeed: ['', [Validators.required, Validators.min(0)]],
      farmingReward: ['', [Validators.required, Validators.min(0)]],
      referralReward: ['', [Validators.required, Validators.min(0)]],
      referralDepth: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    // Дополнительная логика инициализации, если необходимо
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      console.log('Settings Form Data:', this.settingsForm.value);
      // Здесь можно добавить логику для отправки настроек на сервер
      // Например:
      // this.settingsService.updateSettings(this.settingsForm.value).subscribe(
      //   response => {
      //     console.log('Settings updated successfully', response);
      //     // Добавить логику обработки успешного обновления
      //   },
      //   error => {
      //     console.error('Error updating settings', error);
      //     // Добавить логику обработки ошибки
      //   }
      // );
    }
  }
}