import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetAllServiceListDto, ServiceDto } from '../dtos/apiDtos';
import { CommonModule } from '@angular/common';
import { ProductService } from '../service/product.service';
import { HeaderComponent } from "../header/header.component";
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  
  categories: GetAllServiceListDto[]  = []; // Initialize as null
  selectedCategoryName = '';
  services: GetAllServiceListDto[] = [];
  cartItems: ServiceDto[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadCartItems();
  }

  loadServices(): void {
    this.productService.getCategoryServiceList().subscribe({
      next: (data) => {
        this.services = data;
        console.log('Services loaded:', data);
        console.log(this.services)
      },
      error: (error) => {
        console.error('Error loading services:', error);
      },
    });
  }

  selectCategory(categoryId: string): void {
    this.selectedCategoryName = categoryId;
  }

  getServicesByCategory(categoryId: string) {
    const category = this.services.find((c) => c.category.id === categoryId);
    return category ? category.services : [];
  }

  addToCart(serviceId : string){
    console.log(serviceId);
    this.bookingService.addToCart(serviceId).subscribe({
      next: (data) => {
        this.loadCartItems();
      },
      error: (error) => {
        console.error('Error loading services:', error);
      },
    });
  }

  loadCartItems(): void {
    this.bookingService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        console.log('Cart items loaded:', this.cartItems);
      },
      error: (error) => {
        console.error('Failed to load cart items:', error);
        alert('Could not load cart items.');
      }
    });
  }
}
