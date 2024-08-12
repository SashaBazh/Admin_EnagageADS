import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ThemeService } from '../../theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-baner',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HeaderComponent],
  templateUrl: './baner.component.html',
  styleUrl: './baner.component.css'
})
export class BanerComponent implements OnInit, OnDestroy {
  bannerForm: FormGroup;
  imageSelected: boolean = false;
  isDarkTheme = false;
  private themeSubscription: Subscription | undefined;
  
  constructor(private fb: FormBuilder, private themeService: ThemeService) {
    this.bannerForm = this.fb.group({
      link: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
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
    const file = event.target.files[0];
    if (file) {
      this.imageSelected = true;
      console.log('Файл выбран:', file);
    } else {
      this.imageSelected = false;
    }
  }

  onSubmit() {
    if (this.bannerForm.valid && this.imageSelected) {
      console.log('Форма отправлена:', this.bannerForm.value);
      // Здесь вы можете добавить логику для отправки данных на сервер
    } else {
      console.log('Форма невалидна');
    }
  }

  isFormValid(): boolean {
    return this.bannerForm.valid && this.imageSelected;
  }
}