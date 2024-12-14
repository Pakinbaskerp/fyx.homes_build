import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BookCarpenderWithServiceDto,
    BookedDetailsDto,
    ServiceDto
} from '../dtos/apiDtos';
import { environment } from '../../../common.constant';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  private baseApiUrl = environment.apiBaseUrl;

  bookCarpenderService(carpenderId: any, bookCarpenderWithServiceDto: BookCarpenderWithServiceDto) {
    const headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
    });
    const apiUrl = `${this.baseApiUrl}api/bookService?carpender-id=${carpenderId}`;
    return this.http.post<BookedDetailsDto[]>(apiUrl, bookCarpenderWithServiceDto, { headers });
  }

  addToCart(serviceId : string){
    const headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
    });
    const url = `${this.baseApiUrl}api/add-to-cart/${serviceId}`;
    return this.http.post(url, headers);
  }

  getCartItems(){
    const headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
    });
    const url = `${this.baseApiUrl}api/add-to-cart`;
    return this.http.get<ServiceDto[]>(url, {headers});
  }

 
}
