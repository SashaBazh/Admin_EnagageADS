import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-baner',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './baner.component.html',
  styleUrl: './baner.component.css'
})
export class BanerComponent {
  bannerForm: FormGroup;
  imageSelected: boolean = false;
  
  constructor(private fb: FormBuilder) {
    this.bannerForm = this.fb.group({
      link: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      type: ['', Validators.required]
    });
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