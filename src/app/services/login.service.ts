import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = '/api/login'; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
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

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
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