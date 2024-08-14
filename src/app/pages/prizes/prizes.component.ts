import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { PrizeService } from '../../services/prizes.service';
import { submitPrizeForm, uploadFile } from '../../functions/prize.functions';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-prizes',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent, ModalComponent],
  templateUrl: './prizes.component.html',
  styleUrl: './prizes.component.css'
})
export class PrizeComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  prizeForm: FormGroup;
  selectedFile: File | null = null;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;
  modalMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private prizeService: PrizeService
  ) {
    this.prizeForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      drawInterval: ['', Validators.required]
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = uploadFile(file);
    }
  }

  onSubmit() {
    const submission = submitPrizeForm(this.prizeForm, this.selectedFile, this.prizeService);
    if (submission) {
      submission.subscribe(
        response => {
          this.modalMessage = `Приз успешно создано с ID: ${response.id}`;
          this.modal.show();
        },
        error => {
          this.modalMessage = `Ошибка при создании Приза: ${error.message}`;
          this.modal.show();
        }
      );
    }
  }
}