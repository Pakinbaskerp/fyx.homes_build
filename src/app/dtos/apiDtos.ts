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
  id: string;                  // Guid in C# maps to string in TypeScript
  serviceName: string;
  serviceDescription: string;
  sortOrder: number;
  fileName: string;
  filePath: string;
  price: number;
  currency: string;
}
