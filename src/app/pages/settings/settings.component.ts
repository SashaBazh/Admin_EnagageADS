// src/app/components/settings/settings.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { SettingsService } from '../../services/settings.service';
import { submitSettingsForm } from '../../functions/settings.functions';
import { Options } from '@angular-slider/ngx-slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent, NgxSliderModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;

  rankThresholdsValue: number = 0;
  rankThresholdsHighValue: number = 1000;
  rankThresholdsOptions: Options = {
    floor: 0,
    ceil: 1000,
    step: 10,
    showTicks: true,
    draggableRange: true
  };

  constructor(
    private fb: FormBuilder, 
    private themeService: ThemeService,
    private settingsService: SettingsService
  ) {
    this.settingsForm = this.fb.group({
      rankSystem: ['', Validators.required],
      farmingSpeed: [1, [Validators.required, Validators.min(1)]],
      farmingReward: [0, [Validators.required, Validators.min(0)]],
      referralReward: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      referralDepth: [1, [Validators.required, Validators.min(1), Validators.max(3)]]
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

  onSubmit() {
    const submission = submitSettingsForm(this.settingsForm, this.rankThresholdsValue, this.rankThresholdsHighValue, this.settingsService);
    if (submission) {
      submission.subscribe(
        response => {
          console.log('Настройки успешно применены:', response.message);
        },
        error => {
          console.error('Ошибка при применении настроек:', error);
        }
      );
    }
  }
}