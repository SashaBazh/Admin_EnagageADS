import { FormGroup } from '@angular/forms';
import { PayoutsService } from '../services/payouts.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export function downloadCurrentPayouts(payoutService: PayoutsService): Observable<string> {
  return payoutService.getCurrentPayouts().pipe(
    map((data: any[]) => {
      console.log('Данные, полученные с бэкенда:', data);
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      downloadFile(blob, 'current_payouts.json');
      return 'Текущие выплаты успешно скачаны';
    }),
    catchError(error => {
      console.error('Error downloading current payouts:', error);
      return throwError('Ошибка при скачивании текущих выплат');
    })
  );
}

function downloadFile(data: Blob, fileName: string) {
  const downloadURL = window.URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = downloadURL;
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(downloadURL);
}