import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payouts',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './payouts.component.html',
  styleUrl: './payouts.component.css'
})
export class PayoutsComponent {
  payoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.payoutForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  downloadReport() {
    if (this.payoutForm.valid) {
      const startDate = this.payoutForm.get('startDate')?.value;
      const endDate = this.payoutForm.get('endDate')?.value;
      console.log(`Downloading report from ${startDate} to ${endDate}`);
      // Здесь добавьте логику для скачивания отчета
    }
  }

  downloadCurrentPayouts() {
    console.log('Downloading current payouts');
    // Здесь добавьте логику для скачивания актуальных выплат
  }
}