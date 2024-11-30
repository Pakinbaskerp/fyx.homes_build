import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../common.constant';
import { HeaderComponent } from './header/header.component';
import { Title } from '@angular/platform-browser';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private titleService: Title) {
    this.setTitle(environment.appTitle);
  }

  private setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }
}
