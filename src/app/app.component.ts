import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  title = 'site_haos_group';
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;

  constructor(private themeService: ThemeService, private renderer: Renderer2, ) {}

  ngOnInit() {
    this.themeService.getThemeObservable().subscribe(isDark => {
      if (isDark) {
        this.renderer.addClass(document.body, 'dark-theme');
      } else {
        this.renderer.removeClass(document.body, 'dark-theme');
      }
    });

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

}
