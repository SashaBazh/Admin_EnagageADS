import { FormGroup } from '@angular/forms';
import { SettingsService } from '../services/settings.service';
import { Observable } from 'rxjs';

export interface SettingsResponse {
  message: string;
}

export function createSettingsData(settingsForm: FormGroup, rankThresholdsLow: number, rankThresholdsHigh: number): any {
  return {
    rank_system: {
      rank_name: settingsForm.get('rankSystem')?.value,
      thresholds: [rankThresholdsLow, rankThresholdsHigh],
      farming_speed: settingsForm.get('farmingSpeed')?.value
    },
    farming_rewards: settingsForm.get('farmingReward')?.value,
    referral_rewards: {
      level1: settingsForm.get('referralReward')?.value,
      level2: settingsForm.get('referralReward')?.value * 0.6, // Пример: 60% от уровня 1
      level3: settingsForm.get('referralReward')?.value * 0.3, // Пример: 30% от уровня 1
      depth: settingsForm.get('referralDepth')?.value
    }
  };
}

export function submitSettingsForm(settingsForm: FormGroup, rankThresholdsLow: number, rankThresholdsHigh: number, settingsService: SettingsService): Observable<SettingsResponse> | null {
  if (settingsForm.valid) {
    const settingsData = createSettingsData(settingsForm, rankThresholdsLow, rankThresholdsHigh);
    return settingsService.applySettings(settingsData);
  } else {
    console.log('Форма невалидна');
    return null;
  }
}