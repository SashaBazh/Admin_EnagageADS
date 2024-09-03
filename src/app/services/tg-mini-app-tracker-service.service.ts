import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments';

declare global {
  interface Window {
    Telegram: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TgMiniAppTrackerService {
  private serverUrl: string;
  private projectId: string;
  private tgWebApp: any;

  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
    this.projectId = environment.projectId;
    this.tgWebApp = window.Telegram.WebApp;
  }

  init(): void {
    this.collectData();
  }

  private getPlatform(): string {
    const platform = this.tgWebApp.platform;
    return platform;
  }

  private collectData(): void {
    const entryTime = new Date().toISOString();
  
    const data = {
      projectId: this.projectId,
      userId: this.tgWebApp.initDataUnsafe.user.id,
      nickname: this.tgWebApp.initDataUnsafe.user.username,
      platform: this.getPlatform(),
      isPremium: this.tgWebApp.initDataUnsafe.user.is_premium || false,
      entryTime: entryTime
    };
  
    alert(JSON.stringify(data));
  
    this.tgWebApp.onEvent('mainButtonClicked', () => {
      const exitTime = new Date().toISOString();
      this.sendData({ ...data, exitTime });
    });
  }
  
  private sendData(data: any): void {
    const url = `${this.serverUrl}`;
  
    this.http.post<{ message: string }>(url, data)
      .subscribe({
        next: (response) => {
          console.log('Data sent successfully:', response);
        },
        error: (error) => {
          console.error('Error sending data:', error);
        }
      });
  }
}