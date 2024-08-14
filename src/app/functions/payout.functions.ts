import { FormGroup } from '@angular/forms';
import { PayoutsService } from '../services/payouts.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export function downloadReport(payoutForm: FormGroup, payoutService: PayoutsService): Observable<string> {
  if (payoutForm.valid) {
    const startDate = payoutForm.get('startDate')?.value;
    const endDate = payoutForm.get('endDate')?.value;
    return payoutService.getPayoutReport(startDate, endDate).pipe(
      map((data: Blob) => {
        downloadFile(data, `payout_report_${startDate}_${endDate}.csv`);
        return 'Отчет успешно скачан';
      }),
      catchError(error => {
        console.error('Error downloading report:', error);
        return throwError('Ошибка при скачивании отчета');
      })
    );
  } else {
    return throwError('Форма невалидна');
  }
}

export function downloadCurrentPayouts(payoutService: PayoutsService): Observable<string> {
  return payoutService.getCurrentPayouts().pipe(
    map((data: Blob) => {
      downloadFile(data, 'current_payouts.csv');
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
}