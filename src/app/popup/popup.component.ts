import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import {
  BookCarpenderWithServiceDto,
  CarpenterDetailsDto,
  CreateServiceDto,
  GetCategoryListDto,
} from '../dtos/apiDtos';
import { FormsModule } from '@angular/forms';
import { error } from 'node:console';
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  categories: GetCategoryListDto[] = []; // List of categories
  services: CreateServiceDto[] = [];
  carpenders: CarpenterDetailsDto[] = [];
  selectedCarpenderId: string | undefined;
  selectedCategory: string | undefined; // Holds the selected category ID
  selectedServiceId: string | undefined; // Holds the selected service ID
  selectedService: CreateServiceDto | undefined; // Holds the selected service details
  selectedDateTime: string | undefined;
  isVisible = false;

  constructor(
    private productService: ProductService,
    private bookingService: BookingService,
  ) {}

  openPopup() {
    this.isVisible = true;
    this.getCategoryList();
    this.getCarpenderList();
  }

  // Fetch list of categories
  getCategoryList() {
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

  // Fetch services for the selected category
  getServiceList() {
    if (this.selectedCategory) {
      this.productService.getServiceList(this.selectedCategory).subscribe({
        next: (data) => {
          this.services = data;
          console.log('Services fetched:', this.services);
        },
        error: (error) => {
          console.error('Error fetching services:', error);
        },
      });
    }
  }
  getCarpenderList() {
    this.productService.geCarpenderList().subscribe({
      next: (data) => {
        this.carpenders = data;
        console.log(this.carpenders);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Get the selected service details
  getSelectedService() {
    this.selectedService = this.services.find(
      (service) => service.id === this.selectedServiceId,
    );
  }

  closePopup() {
    this.isVisible = false;
  }

  onButtonClick(selectedCarpenderId: any) {
    const b: BookCarpenderWithServiceDto = {
      serviceId: this.selectedServiceId,
      bookedDate: this.selectedDateTime,
    };
    console.log(selectedCarpenderId)
    this.bookingService.bookCarpenderService(selectedCarpenderId, b).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
