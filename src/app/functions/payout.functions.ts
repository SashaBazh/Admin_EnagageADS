import { FormGroup } from '@angular/forms';
import { PayoutsService } from '../services/payouts.service';

export function downloadReport(payoutForm: FormGroup, payoutService: PayoutsService) {
  if (payoutForm.valid) {
    const startDate = payoutForm.get('startDate')?.value;
    const endDate = payoutForm.get('endDate')?.value;
    payoutService.getPayoutReport(startDate, endDate).subscribe(
      (data: Blob) => {
        downloadFile(data, `payout_report_${startDate}_${endDate}.csv`);
      },
      error => {
        console.error('Error downloading report:', error);
      }
    );
  }
}

export function downloadCurrentPayouts(payoutService: PayoutsService) {
  payoutService.getCurrentPayouts().subscribe(
    (data: Blob) => {
      downloadFile(data, 'current_payouts.csv');
    },
    error => {
      console.error('Error downloading current payouts:', error);
    }
  );
}

function downloadFile(data: Blob, fileName: string) {
  const downloadURL = window.URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = downloadURL;
  link.download = fileName;
  link.click();
}