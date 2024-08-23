import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { PayoutsService } from '../../services/payouts.service';
import { downloadCurrentPayouts } from '../../functions/payout.functions';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-payouts',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent, ModalComponent],
  templateUrl: './payouts.component.html',
  styleUrl: './payouts.component.css'
})
export class PayoutsComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  payoutForm: FormGroup;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;
  modalMessage: string = '';

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
  
  downloadCurrentPayouts() {
    downloadCurrentPayouts(this.payoutService).subscribe(
      (response) => {
        this.modalMessage = 'Текущие выплаты успешно скачаны';
        this.modal.show();
      },
      (error) => {
        this.modalMessage = `Ошибка при скачивании текущих выплат: ${error.message}`;
        this.modal.show();
      }
    );
  }
}