import { Component, HostListener } from '@angular/core';
import { environment } from '../../../common.constant';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title: string = environment.homeTitle;
  isMenuOpen = false;

  constructor(private router: Router,private authService: AuthService) {}

  toggleMenu(event: Event) {
    event.stopPropagation(); // Prevents closing when clicking inside the hamburger
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.hamburger-menu') && !targetElement.closest('.menu-items')) {
      this.isMenuOpen = false; // Close the menu if clicked outside
    }
  }

  navigateTo(route: string) {
    this.isMenuOpen = false;
    this.router.navigate([route]);
  }

  logout() {
    this.isMenuOpen = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
