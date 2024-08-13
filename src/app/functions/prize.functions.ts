import { FormGroup } from '@angular/forms';
import { PrizeService } from '../services/prizes.service';
import { Observable } from 'rxjs';

export interface PrizeResponse {
  id: number;
}

export function createPrizeFormData(prizeForm: FormGroup, selectedFile: File | null): FormData {
  const formData = new FormData();
  formData.append('type', prizeForm.get('type')?.value);
  formData.append('description', prizeForm.get('description')?.value);
  formData.append('price', prizeForm.get('price')?.value);
  formData.append('draw_date', calculateDrawDate(prizeForm.get('drawInterval')?.value));
  
  if (selectedFile) {
    formData.append('image', selectedFile);
  }

  return formData;
}

export function submitPrizeForm(prizeForm: FormGroup, selectedFile: File | null, prizeService: PrizeService): Observable<PrizeResponse> | null {
  if (prizeForm.valid) {
    const formData = createPrizeFormData(prizeForm, selectedFile);
    return prizeService.createPrize(formData);
  } else {
    console.log('Форма невалидна');
    return null;
  }
}

export function uploadFile(file: File): File {
  return file;
}

function calculateDrawDate(interval: string): string {
  const now = new Date();
  switch (interval) {
    case 'weekly':
      now.setDate(now.getDate() + 7);
      break;
    case 'monthly':
      now.setMonth(now.getMonth() + 1);
      break;
    case 'quarterly':
      now.setMonth(now.getMonth() + 3);
      break;
    case 'semiannually':
      now.setMonth(now.getMonth() + 6);
      break;
    case 'annually':
      now.setFullYear(now.getFullYear() + 1);
      break;
  }
  return now.toISOString();
}