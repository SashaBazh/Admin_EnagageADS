import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environment.apiUrl}/api/login`;
  private adminCheckUrl = `${environment.apiUrl}/api/user/is-admin`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginData = { username: username, password: password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('Отправка запроса на авторизацию:', loginData);

    return this.http.post(this.apiUrl, loginData, { headers }).pipe(
      tap(
        (response: any) => {
          console.log('Ответ от сервера:', response);
          if (response && response.access_token) {
            this.setSession(response);
            console.log('Авторизация успешна');
          }
        },
        error => console.error('Ошибка авторизации:', error)
      )
    );
  }

  private setSession(authResult: any) {
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('token_type', authResult.token_type);
    console.log('Токены сохранены в localStorage');
  }

  checkAdminStatus(): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get<{ is_admin: boolean }>(this.adminCheckUrl, { headers }).pipe(
      map(response => response.is_admin),
      tap(isAdmin => {
        localStorage.setItem('is_admin', isAdmin.toString());
        console.log('Статус администратора обновлен:', isAdmin);
      }),
      catchError(error => {
        console.error('Ошибка при проверке статуса администратора:', error);
        return of(false);
      })
    );
  }

  isAdmin(): boolean {
    return localStorage.getItem('is_admin') === 'true';
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('is_admin');
    console.log('Пользователь вышел из системы');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    const isLoggedIn = !!token;
    console.log('Статус авторизации:', isLoggedIn);
    return isLoggedIn;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}