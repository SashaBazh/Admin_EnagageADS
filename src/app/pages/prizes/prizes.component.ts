import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-prizes',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './prizes.component.html',
  styleUrl: './prizes.component.css'
})
export class PrizeComponent implements OnInit, OnDestroy {
  prizeForm: FormGroup;
  selectedFile: File | null = null;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder, private themeService: ThemeService) {
    this.prizeForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      drawDate: ['', Validators.required]
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
      this.selectedFile = file;
      // Здесь можно добавить логику для предварительного просмотра изображения, если нужно
    }
  }

  onSubmit() {
    if (this.prizeForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('type', this.prizeForm.get('type')?.value);
      formData.append('description', this.prizeForm.get('description')?.value);
      formData.append('price', this.prizeForm.get('price')?.value);
      formData.append('drawDate', this.prizeForm.get('drawDate')?.value);

      console.log('Form Data:', formData);
      // Здесь вы можете отправить formData на сервер
    }
  }
}