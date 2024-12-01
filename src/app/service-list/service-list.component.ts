import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/apiService';
import { GetCategoryListDto } from '../dtos/apiDtos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'] // Fixed typo here
})
export class ServiceListComponent implements OnInit {

  categories: GetCategoryListDto[] = [];
  token: string | null = localStorage.getItem('authToken');;
    

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    
    

    if (this.token) {
      this.authService.getServiceList(this.token).subscribe({
        next: (data) => {
          this.categories = data;
          console.log('Categories fetched:', data);
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        }
      });
    } else {
      console.error('No auth token found!');
    }
  }
}
