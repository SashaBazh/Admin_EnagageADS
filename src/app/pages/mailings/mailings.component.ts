import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mailings',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './mailings.component.html',
  styleUrl: './mailings.component.css'
})
export class MailingsComponent implements OnInit {
  mailingForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.mailingForm = this.fb.group({
      rankSelection: ['specific', Validators.required], // 'range' или 'specific'
      rankFrom: [''],
      rankTo: [''],
      specificRanks: [''],
      messageText: ['', Validators.required],
      sendTime: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Дополнительная логика инициализации, если необходимо
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.mailingForm.valid) {
      const formData = new FormData();
      formData.append('rankSelection', this.mailingForm.get('rankSelection')?.value);
      if (this.mailingForm.get('rankSelection')?.value === 'range') {
        formData.append('rankFrom', this.mailingForm.get('rankFrom')?.value);
        formData.append('rankTo', this.mailingForm.get('rankTo')?.value);
      } else {
        formData.append('specificRanks', this.mailingForm.get('specificRanks')?.value);
      }
      formData.append('messageText', this.mailingForm.get('messageText')?.value);
      formData.append('sendTime', this.mailingForm.get('sendTime')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      console.log('Mailing Form Data:', formData);
      // Здесь можно добавить логику для отправки данных на сервер
    }
  }
}