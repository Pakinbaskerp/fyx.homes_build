import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateServiceDto, GetCategoryListDto } from '../dtos/apiDtos';
import { environment } from '../../../common.constant';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private baseApiUrl = environment.apiBaseUrl;

  getCategoryList() {
    const headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
    });

    const apiUrl = `${this.baseApiUrl}/api/product/category`;
    return this.http.get<GetCategoryListDto[]>(apiUrl, { headers });
  }

  getServiceList(categoryId : string){
    const headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
    });

    const apiUrl = `${this.baseApiUrl}/api/product/category/service`;
    return this.http.get<CreateServiceDto[]>(`${apiUrl}?category-id=${categoryId}`);
  }
}
