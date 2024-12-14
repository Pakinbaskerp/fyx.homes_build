import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../common.constant';
import { GetCategoryListDto, LoginResponse } from '../dtos/apiDtos';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

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
    localStorage.removeItem('authToken');
  }

  isJwt(token: string): boolean {
    const parts = token.split('.');
    return parts.length === 3;
  }

  decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
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
