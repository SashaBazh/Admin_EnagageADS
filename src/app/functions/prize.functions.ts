import { FormGroup } from '@angular/forms';

export function createPrizeFormData(prizeForm: FormGroup, selectedFile: File): FormData {
  const formData = new FormData();
  formData.append('image', selectedFile);
  formData.append('prize_type', prizeForm.get('type')?.value);
  formData.append('description', prizeForm.get('description')?.value);
  
  const price = Number(prizeForm.get('price')?.value);
  if (isNaN(price)) {
    console.error('Invalid price value:', prizeForm.get('price')?.value);
    throw new Error('Invalid price value');
  }
  formData.append('price', price.toString());

  formData.append('draw_date', calculateDrawDate(prizeForm.get('drawInterval')?.value));
  
  console.log('FormData contents:');
  formData.forEach((value, key) => {
    console.log(key, value);
  });
  
  return formData;
}

function calculateDrawDate(interval: string): string {
  const now = new Date();
  switch (interval) {
    case 'weekly':
      now.setUTCDate(now.getUTCDate() + 7);
      break;
    case 'monthly':
      now.setUTCMonth(now.getUTCMonth() + 1);
      break;
    case 'quarterly':
      now.setUTCMonth(now.getUTCMonth() + 3);
      break;
    case 'semiannually':
      now.setUTCMonth(now.getUTCMonth() + 6);
      break;
    case 'annually':
      now.setUTCFullYear(now.getUTCFullYear() + 1);
      break;
  }
  return now.toISOString().replace(/\.\d{3}Z$/, 'Z');
}