import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../common.constant';
import { GetCategoryListDto, LoginResponse, RefreshTokenDto } from '../dtos/apiDtos';
import { isPlatformBrowser } from '@angular/common';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApiUrl = environment.apiBaseUrl;

  private refreshTokenInterval: any;

  constructor(private http: HttpClient, private router: Router) {}

  private platformId = inject(PLATFORM_ID);

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token && this.isJwt(token)) {
        try {
          const decoded: any = this.decodeJwt(token);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decoded.exp && decoded.exp > currentTime) {
            return true;
          } else {
            localStorage.removeItem('authToken');
            this.logout();
            return false;
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          return false;
        }
      }
      return false;
    }
    return false;
  }

  logout(): void {
    this.stopRefreshTokenTimer(); // Stop the refresh token timer on logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

  isJwt(token: string): boolean {
    const parts = token.split('.');
    return parts.length === 3;
  }

  decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  startRefreshTokenTimer(): void {
    // Call refresh token API every 15 minutes
    this.refreshTokenInterval = setInterval(() => {
      this.refreshToken().subscribe({
        next: (response) => {
          console.log('Refresh token successful:', response);
          if (response && response.token) {
            // localStorage.setItem('authToken', response.token);
            localStorage.setItem('accessToken', response.accessToken);
          }
        },
        error: (error) => {
          console.error('Error refreshing token:', error);
          this.logout();
        },
      });
    }, 14 * 60 * 1000); // 15 minutes
  }

  stopRefreshTokenTimer(): void {
    if (this.refreshTokenInterval) {
      clearInterval(this.refreshTokenInterval); 
      this.refreshTokenInterval = null;
    }
  }

  loginUser(loginData: any) {
    console.log(loginData);
    const headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
    });

    const apiUrl = `${this.baseApiUrl}api/auth/login`;

    return this.http.post<LoginResponse>(apiUrl, loginData, { headers }).pipe(
      catchError((error) => {
        console.error('Login failed', error);
        alert(
          'Login failed. Please check your credentials or try again later.',
        );
        return of(null);
      }),
    );
  }
  refreshToken() {
    const refreshTokenDto = {
      token: localStorage.getItem('refreshToken') || '', // Replace with the actual refresh token key
      accessToken: localStorage.getItem('accessToken') || '', // Replace with the correct access token key
    };
    const headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
    });
    
    return this.http.post<RefreshTokenDto>(
      `${this.baseApiUrl}api/auth/refresh-token`,
      refreshTokenDto,
      {headers}
    );
  }

  registerUser(registerData: any) {
    const headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
    });
    const url = `${this.baseApiUrl}api/auth/register`;

    return this.http.post<LoginResponse>(url, registerData, { headers }).pipe(
      catchError((error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again later.');
        return of(null);
      }),
    );
  }
}
