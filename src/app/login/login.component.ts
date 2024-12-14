import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { GetCategoryListDto, LoginDto } from '../dtos/apiDtos';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoginTab: boolean = true;
  username: string = '';
  password: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  registerPassword: string = '';

  userType: string = 'user';
  isTabSelected: boolean = false;
  isUser: boolean = this.userType === 'user';
  isCarpender: boolean = this.userType === 'carpenter';

  categories: GetCategoryListDto[] = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  showLoginForm() {
    this.isTabSelected = true;
    this.isLoginTab = true;
  }

  showRegisterForm() {
    this.isTabSelected = true;
    this.isLoginTab = false;
  }

  isJwt(token: string): boolean {
    const parts = token.split('.');
    return parts.length === 3;
  }

  decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  onRegister(event: Event) {
    event.preventDefault();
    this.isUser = this.userType === 'user';
    this.isCarpender = this.userType === 'carpenter';

    const registerData = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      password: this.registerPassword,
      isUser: this.isUser,
      isCarpender: this.isCarpender,
    };

    this.authService.registerUser(registerData).subscribe((response: any) => {
      if (response) {
        console.log('Registration successful:', response);
        alert('Registration successful!');
      }
    });
  }

  onLogin(event: Event): void {
    event.preventDefault();

    if (!this.username || !this.password) {
      alert('Please enter both username and password.');
      return;
    }

    const loginData: LoginDto = {
      email: this.username,
      password: this.password,
    };
    this.authService.loginUser(loginData).subscribe({
      next: (response) => {
        if (response && response.token) {
          const token = response.token;

          if (this.isJwt(token)) {
            console.log('Valid JWT token:', token);
            const payload = this.decodeJwt(token);
            console.log('Decoded payload:', payload);

            const userRole = payload.role;
            if (userRole === 'User') {
              this.router.navigate(['/dashboard']);
            } else if (userRole === 'Admin') {
              this.router.navigate(['/admin-dashboard']);
            }

            localStorage.setItem('authToken', token);
          }
        } else {
          alert('Invalid credentials');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('An error occurred during login. Please try again later.');
      },
      complete: () => {
        console.log('Login request completed');
      },
    });
  }
}
