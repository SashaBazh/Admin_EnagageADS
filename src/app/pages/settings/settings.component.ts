import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
import { ModalComponent } from '../../pages/modal/modal.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent, NgxSliderModule, ModalComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  settingsForm: FormGroup;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;
  modalMessage: string = '';

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
          this.modalMessage = `Настройки успешно применены: ${response.message}`;
          this.modal.show();
        },
        error => {
          this.modalMessage = `Ошибка при применении настроек: ${error.message}`;
          this.modal.show();
        }
      );
    }
  }
}