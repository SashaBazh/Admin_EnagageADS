import { FormGroup } from '@angular/forms';
import { MailingsService } from '../services/mailings.service';
import { Observable } from 'rxjs';

export interface MailingResponse {
  id: number;
}

export function createMailingFormData(mailingForm: FormGroup, selectedFile: File | null): FormData {
  const formData = new FormData();
  
  const ranks = mailingForm.get('rankSelection')?.value === 'range'
    ? Array.from({ length: mailingForm.get('rankTo')?.value - mailingForm.get('rankFrom')?.value + 1 }, (_, i) => i + mailingForm.get('rankFrom')?.value)
    : mailingForm.get('specificRanks')?.value.split(',').map((rank: string) => parseInt(rank.trim()));
  
  formData.append('ranks', JSON.stringify(ranks));
  formData.append('message', mailingForm.get('messageText')?.value);
  formData.append('send_time', new Date(mailingForm.get('sendTime')?.value).toISOString());
  
  if (selectedFile) {
    formData.append('image', selectedFile);
  }

  return formData;
}

export function submitMailingForm(mailingForm: FormGroup, selectedFile: File | null, mailingService: MailingsService): Observable<MailingResponse> | null {
  if (mailingForm.valid) {
    const formData = createMailingFormData(mailingForm, selectedFile);
    return mailingService.createMailing(formData);
  } else {
    console.log('Форма невалидна');
    return null;
  }
}

export function validateRanks(mailingForm: FormGroup): boolean {
  if (mailingForm.get('rankSelection')?.value === 'range') {
    const from = mailingForm.get('rankFrom')?.value;
    const to = mailingForm.get('rankTo')?.value;
    return from !== '' && to !== '' && from <= to;
  } else {
    const specificRanks = mailingForm.get('specificRanks')?.value;
    return specificRanks !== '' && /^(\d+,)*\d+$/.test(specificRanks);
  }
}