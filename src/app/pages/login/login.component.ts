import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { login } from '../../functions/login.functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private loginService: LoginService) {}

  async onLogin() {
    try {
      await login(this.username, this.password, this.loginService);
      this.errorMessage = '';
      // Навигация может быть выполнена здесь или через сервис
    } catch (error) {
      this.errorMessage = 'Неверный логин или пароль';
    }
  }
}