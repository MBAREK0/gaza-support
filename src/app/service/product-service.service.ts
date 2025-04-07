import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Update this URL to your Laravel API endpoint
  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Get product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Upload new product
  uploadProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  // Delete product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
