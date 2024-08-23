import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { SettingsService } from '../../services/settings.service';
import { SettingsData } from '../../functions/settings.functions';
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
  currentSettings: SettingsData | null = null;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;
  modalMessage: string = '';
  rankThresholdsValue: number = 0;
  rankThresholdsHighValue: number = 1000;
  rankThresholdsOptions: Options = {
    floor: 0,
    ceil: 1000,
  };
  response: string = '';

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private settingsService: SettingsService,
  ) {

    this.settingsForm = this.fb.group({
      rank_name: ['', Validators.required],
      threshold_low: [0, [Validators.required, Validators.min(0)]],
      threshold_high: [0, [Validators.required, Validators.min(0)]],
      farming_speed: [0, [Validators.required, Validators.min(0)]],
      farming_rewards: [0, [Validators.required, Validators.min(0)]],
      referral_level1: [0, [Validators.required, Validators.min(0)]],
      referral_level2: [0, [Validators.required, Validators.min(0)]],
      referral_level3: [0, [Validators.required, Validators.min(0)]],
      referral_depth: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadSettings();
    this.themeSubscription = this.themeService.getThemeObservable().subscribe(
      isDark => {
        this.isDarkTheme = isDark;
      }
    );
  }

  loadSettings() {
    this.settingsService.getSettings().subscribe(
      (response: any) => {
        console.log('Received settings:', response);
        if (response && response[0] && response[0].value && response[0].value.settings) {
          const settings = response[0].value.settings;
          this.currentSettings = settings;
  
          const formValues = {
            rank_name: settings.rank_system?.rank_name || '',
            threshold_low: settings.rank_system?.thresholds[0] || 0,
            threshold_high: settings.rank_system?.thresholds[1] || 0,
            farming_speed: settings.rank_system?.farming_speed || 0,
            farming_rewards: settings.farming_rewards || 0,
            referral_level1: settings.referral_rewards?.level1 || 0,
            referral_level2: settings.referral_rewards?.level2 || 0,
            referral_level3: settings.referral_rewards?.level3 || 0,
            referral_depth: settings.referral_rewards?.depth || 0
          };
  
          this.settingsForm.patchValue(formValues);
        } else {
          console.log('Settings data is not in the expected format');
        }
      },
      error => console.error('Error loading settings:', error)
    );
  }
  
  

  onSubmit() {
    if (this.settingsForm.valid) {
      const formValue = this.settingsForm.value;
      const settingsName = "systemSettings";
      const settings: SettingsData = {
        settings: {
          rank_system: {
            rank_name: formValue.rank_name,
            thresholds: [formValue.threshold_low, formValue.threshold_high],
            farming_speed: formValue.farming_speed
          },
          farming_rewards: formValue.farming_rewards,
          referral_rewards: {
            level1: formValue.referral_level1,
            level2: formValue.referral_level2,
            level3: formValue.referral_level3,
            depth: formValue.referral_depth
          }
        }
      };
  
      this.settingsService.applySettings(settingsName, settings).subscribe(
        response => {
          console.log('Settings applied successfully:', response.message);
          this.loadSettings();
        },
        error => console.error('Error applying settings:', error)
      );
    }
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
