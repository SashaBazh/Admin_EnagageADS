import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  // Правильные значения для сравнения
  correctUsername = 'a';
  correctPassword = 'a';

  constructor(private router: Router) {}

  checkCredentials() {
    if (this.username === this.correctUsername && this.password === this.correctPassword) {
      // Если логин и пароль совпадают с правильными значениями
      this.errorMessage = '';
      this.router.navigate(['/baner']); 
    } else {
      // Если не совпадают, показываем сообщение об ошибке
      this.errorMessage = 'Неверный логин или пароль';
    }
  }
}