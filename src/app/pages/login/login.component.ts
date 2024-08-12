import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  // Правильные значения для сравнения
  correctUsername: string = 'a';
  correctPassword: string = 'a';

  constructor(private router: Router) {}

  checkCredentials() {
    this.router.navigate(['/baner']);
    // console.log('checkCredentials вызвана');
    // if (this.username === this.correctUsername && this.password === this.correctPassword) {
    //   // Если логин и пароль совпадают с правильными значениями
    //   this.errorMessage = '';
    //   this.router.navigate(['/baner']);
    // } else {
    //   // Если не совпадают, показываем сообщение об ошибке
    //   this.errorMessage = 'Неверный логин или пароль';
    // }
  }
}
