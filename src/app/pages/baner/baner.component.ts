import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { BanerService } from '../../services/baner.service';
import { ModalComponent } from '../../pages/modal/modal.component';

@Component({
  selector: 'app-baner',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HeaderComponent, ModalComponent],
  templateUrl: './baner.component.html',
  styleUrl: './baner.component.css'
})
export class BanerComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  bannerForm: FormGroup;
  selectedFile: File | null = null;
  isDarkTheme = false;
  private themeSubscription: Subscription | undefined;
  modalMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private banerService: BanerService
  ) {
    this.bannerForm = this.fb.group({
      link: [''], 
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
    if (this.bannerForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('link', this.bannerForm.get('link')?.value || '');
      formData.append('start_time', this.bannerForm.get('startTime')?.value);
      formData.append('end_time', this.bannerForm.get('endTime')?.value);
      formData.append('banner_type', this.bannerForm.get('type')?.value); 
      this.banerService.createBanner(formData).subscribe(
        response => {
          this.modalMessage = `Баннер успешно создан с ID: ${response.banner_id}`;
          this.modal.show();
          this.bannerForm.reset();
          this.selectedFile = null;
        },
        error => {
          this.modalMessage = `Ошибка при создании баннера: ${error.message}`;
          this.modal.show();
        }
      );
    } else {
      console.log('Форма невалидна');
    }
  }
}