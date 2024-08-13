import { FormGroup } from '@angular/forms';
import { BanerService } from '../services/baner.service';

export function createBannerFormData(bannerForm: FormGroup, selectedFile: File | null): FormData {
  const formData = new FormData();
  if (selectedFile) {
    formData.append('image', selectedFile);
  }
  formData.append('link', bannerForm.get('link')?.value);
  formData.append('start_time', bannerForm.get('startTime')?.value);
  formData.append('end_time', bannerForm.get('endTime')?.value);
  formData.append('type', bannerForm.get('type')?.value);
  return formData;
}

export function submitBannerForm(bannerForm: FormGroup, selectedFile: File | null, banerService: BanerService) {
  if (bannerForm.valid && selectedFile) {
    const formData = createBannerFormData(bannerForm, selectedFile);
    return banerService.createBanner(formData);
  } else {
    console.log('Форма невалидна');
    return null;
  }
}

export function isFormValid(bannerForm: FormGroup, selectedFile: File | null): boolean {
  return bannerForm.valid && !!selectedFile;
}