import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetCategoryListDto } from '../dtos/apiDtos';
import { CommonModule } from '@angular/common';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  categories: GetCategoryListDto[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.productService.getCategoryList().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories fetched:', data);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }
}
