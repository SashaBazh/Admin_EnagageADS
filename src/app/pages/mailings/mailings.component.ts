import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../theme.service';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-mailings',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent, EditorModule],
  templateUrl: './mailings.component.html',
  styleUrl: './mailings.component.css'
})
export class MailingsComponent implements OnInit, OnDestroy {
  mailingForm: FormGroup;
  selectedFile: File | null = null;
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;

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

  constructor(private fb: FormBuilder,
    private themeService: ThemeService) {
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