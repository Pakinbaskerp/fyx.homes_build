import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { CreateServiceDto, GetCategoryListDto } from '../dtos/apiDtos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  categories: GetCategoryListDto[] = [];  // List of categories
  services: CreateServiceDto[] = [];      // List of services
  selectedCategory: string | undefined;   // Holds the selected category ID
  selectedServiceId: string | undefined;  // Holds the selected service ID
  selectedService: CreateServiceDto | undefined; // Holds the selected service details
  isVisible = false;

  constructor(private productService: ProductService) {}

  openPopup() {
    this.isVisible = true;
    this.getCategoryList();  // Fetch categories when the popup opens
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
          console.log('Services fetched:', data);
        },
        error: (error) => {
          console.error('Error fetching services:', error);
        },
      });
    }
  }

  // Get the selected service details
  getSelectedService() {
    this.selectedService = this.services.find(service => service.id === this.selectedServiceId);
  }

  closePopup() {
    this.isVisible = false;
  }
}
