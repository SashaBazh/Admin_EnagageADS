import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MailingsService } from '../../services/mailings.service';
import { validateRanks } from '../../functions/mailing.functions'; 
import { EditorModule } from '@tinymce/tinymce-angular'; 
import { HeaderComponent } from '../header/header.component';
import { ModalComponent } from '../../pages/modal/modal.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-mailings',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent, EditorModule, ModalComponent],
  templateUrl: './mailings.component.html', 
  styleUrls: ['./mailings.component.css']  
})
export class MailingsComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent) modal!: ModalComponent; 
  mailingForm: FormGroup;
  selectedFile: File | null = null;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;
  modalMessage: string = '';
  submissionResult: string = '';  

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
    this.selectedFile = event.target.files[0];
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
    if (this.mailingForm.valid) {
      const formData = new FormData();
      formData.append('message', this.mailingForm.get('messageText')?.value || '');
      formData.append('send_time', new Date(this.mailingForm.get('sendTime')?.value).toISOString());
  
      const ranks = this.mailingForm.get('rankSelection')?.value === 'range'
        ? Array.from({ length: this.mailingForm.get('rankTo')?.value - this.mailingForm.get('rankFrom')?.value + 1 }, (_, i) => i + this.mailingForm.get('rankFrom')?.value)
        : this.mailingForm.get('specificRanks')?.value.split(',').map((rank: string) => parseInt(rank.trim()));
  
      formData.append('ranks', JSON.stringify(ranks));
  
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
  
      this.mailingsService.createMailing(formData).subscribe(
        response => {
          this.modalMessage = `Рассылка успешно создана`;
          this.modal.show();
          this.mailingForm.reset();
          this.selectedFile = null; 
        },
        error => {
          this.modalMessage = `Ошибка при создании рассылки: ${error.message}`;
          this.modal.show();
        }
      );
    } else {
      console.log('Форма невалидна');
    }
  }
  
}
