import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/apiService';

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

  // onRegister(event: Event) {
  //   event.preventDefault();
  //   console.log("jii")
  //   this.isUser = this.userType === 'user';
  //   this.isCarpender = this.userType === 'carpenter';
  //   const registerData = {
  //     email: this.email,
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     phoneNumber: this.phoneNumber,
  //     password: this.registerPassword,
  //     isUser: this.isUser,
  //     isCarpender: this.isCarpender
  //   };
  //   const headers = new HttpHeaders({
  //     'Accept': '*/*',
  //     'Content-Type': 'application/json'
  //   });
  //   console.log("jii")
  //   const apiUrl = 'https://localhost:44316/api/auth/register';
  //   console.log("jii")
  //   return this.http.post<string>(apiUrl, registerData, { headers }).pipe(
  //     catchError((error) => {
  //       console.error('Login failed', error);
  //       alert('Login failed. Please check your credentials or try again later.');
  //       return of(null);
  //     })
  //   );
  //   console.log('Register:', registerData);
  // }

  onRegister(event: Event) {
    event.preventDefault();

    // Set user type flags
    this.isUser = this.userType === 'user';
    this.isCarpender = this.userType === 'carpenter';

    // Create registration data
    const registerData = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      password: this.registerPassword,
      isUser: this.isUser,
      isCarpender: this.isCarpender,
    };

    // Call the registerUser method from AuthService
    this.authService.registerUser(registerData).subscribe((response: any) => {
      if (response) {
        console.log('Registration successful:', response);
        alert('Registration successful!');
      }
    });
  }
  // registerUser(registerData: any) {
  //   const headers = new HttpHeaders({
  //     'Accept': '*/*',
  //     'Content-Type': 'application/json'
  //   });
  //   const apiUrl = 'https://localhost:44316/api/auth/register';
  //   return this.http.post<LoginResponse>(apiUrl, registerData, { headers }).pipe(
  //     catchError((error) => {
  //       console.error('Registration failed', error);
  //       alert('Registration failed. Please try again later.');
  //       return of(null);
  //     })
  //   );
  // }
  onLogin(event: Event): void {
    event.preventDefault();

    if (!this.username || !this.password) {
      alert('Please enter both username and password.');
      return;
    }

    const loginData = {
      email: this.username,
      password: this.password,
    };

    this.authService.loginUser(loginData).subscribe(
      (response) => {
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
      (error) => {
        console.error('Login failed:', error);
        alert('An error occurred during login. Please try again later.');
      },
    );

    // No need to return any value as the return type is now void.
  }
}
