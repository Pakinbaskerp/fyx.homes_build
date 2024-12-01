import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../common.constant';
import { GetCategoryListDto, LoginResponse } from '../dtos/apiDtos';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}


  
  getServiceList(token: string) {
    
      
      const headers = new HttpHeaders({
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
  
      const apiUrl = `${this.baseApiUrl}/api/product/category`;
      return this.http.get<GetCategoryListDto[]>(apiUrl, { headers });
    }
  
  

  loginUser(loginData: any) {
    console.log(loginData);
    const headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
    });

    const apiUrl = `${this.baseApiUrl}/api/auth/login`;

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
    const url = `${this.baseApiUrl}/api/auth/register`;

    return this.http.post<LoginResponse>(url, registerData, { headers }).pipe(
      catchError((error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again later.');
        return of(null);
      }),
    );
  }
}
