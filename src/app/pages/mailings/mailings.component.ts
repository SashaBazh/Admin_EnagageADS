// src/app/components/mailings/mailings.component.ts

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { MailingsService } from '../../services/mailings.service';
import { submitMailingForm, validateRanks } from '../../functions/mailing.functions';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ModalComponent } from '../../pages/modal/modal.component';

@Component({
  selector: 'app-mailings',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent, EditorModule, ModalComponent],
  templateUrl: './mailings.component.html',
  styleUrl: './mailings.component.css'
})
export class MailingsComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  mailingForm: FormGroup;
  selectedFile: File | null = null;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;
  modalMessage: string = '';

  tinyMceConfig = {
    height: 300,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help'
  };

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private mailingsService: MailingsService
  ) {
    this.mailingForm = this.fb.group({
      rankSelection: ['specific', Validators.required],
      rankFrom: [''],
      rankTo: [''],
      specificRanks: [''],
      messageText: ['', Validators.required],
      sendTime: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.getThemeObservable().subscribe(
      isDark => {
        this.isDarkTheme = isDark;
      }
    );

    this.mailingForm.get('rankSelection')?.valueChanges.subscribe(() => {
      this.validateForm();
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
      this.selectedFile = file;
    }
  }

  validateForm() {
    if (!validateRanks(this.mailingForm)) {
      this.mailingForm.get('rankFrom')?.setErrors({ invalid: true });
      this.mailingForm.get('rankTo')?.setErrors({ invalid: true });
      this.mailingForm.get('specificRanks')?.setErrors({ invalid: true });
    } else {
      this.mailingForm.get('rankFrom')?.setErrors(null);
      this.mailingForm.get('rankTo')?.setErrors(null);
      this.mailingForm.get('specificRanks')?.setErrors(null);
    }
  }

  onSubmit() {
    this.validateForm();
    const submission = submitMailingForm(this.mailingForm, this.selectedFile, this.mailingsService);
    if (submission) {
      submission.subscribe(
        response => {
          this.modalMessage = `Рассылка успешно создана с ID: ${response.id}`;
          this.modal.show();
        },
        error => {
          this.modalMessage = `Ошибка при создании рассылки: ${error.message}`;
          this.modal.show();
        }
      );
    }
  }
}