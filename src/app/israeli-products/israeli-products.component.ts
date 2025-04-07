import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Product } from "../models/product";
import { environment } from "../../environment";

@Component({
  selector: 'app-israeli-products',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, RouterLink],
  templateUrl: './israeli-products.component.html',
  styleUrl: './israeli-products.component.css'
})
export class IsraeliProductsComponent implements OnInit {
  selectedLang = 'en';
  documentDir = 'ltr';

  searchTerm = '';
  selectedCategory = 'all';

  categories: string[] = [];
  filteredProducts: Product[] = [];
  products: Product[] = [];

  isLoading = true;
  error = '';
  apiUrl = environment.apiUrl;

  constructor(
    private translate: TranslateService,
    private http: HttpClient
  ) {
    translate.setDefaultLang('en');
    translate.use(this.selectedLang);
    this.updateDirection(this.selectedLang);
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.error = '';

    this.http.get<any[]>(this.apiUrl + '/api/products')
      .subscribe({
        next: (data) => {
          // Map the snake_case properties to camelCase
          this.products = data.map(item => {
            return {
              ...item,
              // Ensure camelCase properties are populated from snake_case
              productImages: item.product_images || [],
              alternativeBrands: item.alternative_brands || []
            } as Product;
          });

          this.filteredProducts = [...this.products];

          // Extract unique categories
          this.categories = ['all', ...new Set(this.products.map(p => p.category))];

          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading products:', err);
          this.error = 'Failed to load products. Please try again.';
          this.isLoading = false;
        }
      });
  }

  switchLang(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang);
    this.updateDirection(lang);
  }

  updateDirection(lang: string) {
    this.documentDir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', this.documentDir);
    document.body.setAttribute('dir', this.documentDir);

    // Add or remove RTL class from body
    if (lang === 'ar') {
      document.body.classList.add('rtl-language');
    } else {
      document.body.classList.remove('rtl-language');
    }
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      // Filter by search term
      const matchesSearch = this.searchTerm === '' ||
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filter by category
      const matchesCategory = this.selectedCategory === 'all' ||
        product.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  getImagePath(imageName: string): string {
    // Check if the path already contains the storage URL
    if (imageName && (imageName.startsWith('http://') || imageName.startsWith('https://'))) {
      return imageName;
    }

    // For paths stored by Laravel, they'll be in the storage folder
    if (imageName && (imageName.includes('logos/') || imageName.includes('product_images/'))) {
      return this.apiUrl + `/storage/${imageName}`;
    }

    // Fallback to the assets folder for locally stored images
    return `../../assets/logos/products/${imageName}`;
  }
}
