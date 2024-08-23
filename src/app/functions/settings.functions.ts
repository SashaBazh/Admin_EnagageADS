import { FormGroup } from '@angular/forms';

export interface SettingsResponse {
  message: string;
}

export interface SettingsData {
  settings: {
    rank_system: {
      rank_name: string;
      thresholds: number[];
      farming_speed: number;
    };
    farming_rewards: number;
    referral_rewards: {
      level1: number;
      level2: number;
      level3: number;
      depth: number;
    };
  };
}

export interface SettingsResponse {
  id: number;
  name: string;
  value: {
    settings: {
      farming_rewards: number;
      rank_system: {
        farming_speed: number;
        rank_name: string;
        thresholds: number[];
      };
      referral_rewards: {
        depth: number;
        level1: number;
        level2: number;
        level3: number;
      };
    };
  };
}

export function createSettingsData(
  settingsForm: FormGroup,
  rankThresholdsLow: number,
  rankThresholdsHigh: number
): SettingsData {
  return {
    settings: {
      rank_system: {
        rank_name: settingsForm.get('rankSystem')?.value,
        thresholds: [rankThresholdsLow, rankThresholdsHigh],
        farming_speed: settingsForm.get('farmingSpeed')?.value
      },
      farming_rewards: settingsForm.get('farmingReward')?.value,
      referral_rewards: {
        level1: settingsForm.get('referralReward')?.value,
        level2: settingsForm.get('referralReward')?.value * 0.6,
        level3: settingsForm.get('referralReward')?.value * 0.3,
        depth: settingsForm.get('referralDepth')?.value
      }
    }
  };
}
