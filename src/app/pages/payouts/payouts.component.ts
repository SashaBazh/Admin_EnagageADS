import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { PayoutsService } from '../../services/payouts.service';
import { downloadReport, downloadCurrentPayouts } from '../../functions/payout.functions';

@Component({
  selector: 'app-payouts',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './payouts.component.html',
  styleUrl: './payouts.component.css'
})
export class PayoutsComponent implements OnInit, OnDestroy {
  payoutForm: FormGroup;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private payoutService: PayoutsService
  ) {
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
    downloadReport(this.payoutForm, this.payoutService);
  }

  downloadCurrentPayouts() {
    downloadCurrentPayouts(this.payoutService);
  }
}