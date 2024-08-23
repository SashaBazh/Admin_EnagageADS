import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private loginService: LoginService, private router: Router) {}

  async onLogin() {
    try {
      await this.loginService.login(this.username, this.password).toPromise();
      const isAdmin = await this.loginService.checkAdminStatus().toPromise();
      console.log('Статус администратора:', isAdmin);
      this.router.navigate(['/task-verification']);
    } catch (error) {
      console.error('Ошибка при входе в систему:', error);
      this.errorMessage = 'Ошибка при входе в систему. Пожалуйста, проверьте ваши учетные данные и попробуйте снова.';
    }
  }
}