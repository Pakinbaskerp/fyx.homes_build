export interface LoginResponse {
  token: string;
  email: string;
}

export interface GetCategoryListDto {
  id: string;
  categoryName: string;
  categoryDescription: string;
  filePath: string;
  sortOrder: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateServiceDto {
  id: string; // Guid in C# maps to string in TypeScript
  serviceName: string;
  serviceDescription: string;
  sortOrder: number;
  fileName: string;
  filePath: string;
  price: number;
  currency: string;
}

export interface CarpenterDetailsDto {
  carpenderId: string;
  carpenderName: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  yearsOfExperience?: number;
  specialization?: string;
  hourlyRate?: number;
}

export interface BookCarpenderWithServiceDto {
  serviceId: string | undefined; // Assuming GUID is a string in TypeScript
  bookedDate: string | undefined; // DateTime can be a string in ISO 8601 format
}

export interface BookedDetailsDto {
  serviceName: string;
  serviceDescription: string; // Fixed the typo 'ServiceDescprition' to 'serviceDescription'
  price: number;
  bookedDateTime: string; // DateTime can be represented as a string in ISO 8601 format
  bookedCarpenderName: string;
}
export interface ServiceDto {
  id: string;
  serviceName: string;
  serviceDescription: string;
  sortOrder: number;
  fileName: string;
  filePath: string;
  price: number;
  currency: string;
}

export interface CategoryDto {
  id: string;
  categoryName: string;
  categoryDescription: string;
  filePath: string;
  sortOrder: number;
}

export interface GetAllServiceListDto {
  category: CategoryDto;
  services: ServiceDto[];
}
