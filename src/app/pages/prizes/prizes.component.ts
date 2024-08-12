import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prizes',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './prizes.component.html',
  styleUrl: './prizes.component.css'
})
export class PrizeComponent implements OnInit {
  prizeForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.prizeForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      drawDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Если нужна дополнительная логика при инициализации
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