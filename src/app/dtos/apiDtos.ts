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