import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscribable, Subscription } from 'rxjs';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-payouts',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './payouts.component.html',
  styleUrl: './payouts.component.css'
})
export class PayoutsComponent {
  payoutForm: FormGroup;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder, private themeService: ThemeService) {
    this.payoutForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.getThemeObservable().subscribe(
      isDark => {
        this.isDarkTheme = isDark;
      }
    );
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
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