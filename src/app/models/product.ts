export interface Product {
  id: number;
  name: string;
  category: string;
  description?: string;
  logo?: string;

  // Original properties from API (snake_case)
  product_images?: string[];
  alternative_brands?: string[];

  // Mapped properties for Angular (camelCase)
  productImages?: string[];
  alternativeBrands?: string[];

  created_at: string;
  updated_at: string;
}
