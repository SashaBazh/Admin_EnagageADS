import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { BanerService } from '../../services/baner.service';
import { submitBannerForm, isFormValid } from '../../functions/baner.functions';

@Component({
  selector: 'app-baner',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HeaderComponent],
  templateUrl: './baner.component.html',
  styleUrl: './baner.component.css'
})
export class BanerComponent implements OnInit, OnDestroy {
  bannerForm: FormGroup;
  selectedFile: File | null = null;
  isDarkTheme = false;
  private themeSubscription: Subscription | undefined;
  
  constructor(
    private fb: FormBuilder, 
    private themeService: ThemeService,
    private banerService: BanerService
  ) {
    this.bannerForm = this.fb.group({
      link: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.getThemeObservable().subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const submission = submitBannerForm(this.bannerForm, this.selectedFile, this.banerService);
    if (submission) {
      submission.subscribe(
        response => {
          console.log('Баннер успешно создан с ID:', response.id);
        },
        error => {
          console.error('Ошибка при создании баннера:', error);
        }
      );
    }
  }

  isFormValid(): boolean {
    return isFormValid(this.bannerForm, this.selectedFile);
  }
}