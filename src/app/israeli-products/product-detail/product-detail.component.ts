import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "../../models/product";
import { environment } from "../../../environment";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productId: number | null = null;
  product: Product | undefined;
  documentDir = 'ltr';
  defaultImage = '../../assets/logos/products/placeholder.jpg';
  isLoading = true;
  error = '';
  apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private http: HttpClient
  ) {
    this.updateDirection(this.translate.currentLang);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.loadProduct();
      }
    });

    // Listen for language changes
    this.translate.onLangChange.subscribe(event => {
      this.updateDirection(event.lang);
    });
  }

  loadProduct() {
    if (this.productId) {
      this.isLoading = true;
      this.error = '';

      this.http.get<any>(this.apiUrl + `/api/products/${this.productId}`)
        .subscribe({
          next: (data) => {
            // Safely map the data with optional chaining to avoid undefined errors
            const product: Product = {
              ...data,
              // Add default values to prevent undefined errors
              productImages: data.product_images || [],
              alternativeBrands: data.alternative_brands || [],
              // Add other required properties with defaults
              id: data.id || 0,
              name: data.name || '',
              category: data.category || '',
              description: data.description || '',
              logo: data.logo || '',
              created_at: data.created_at || '',
              updated_at: data.updated_at || ''
            };

            this.product = product;

            console.log("Received product data:", data);
            console.log("Mapped product object:", this.product);

            this.isLoading = false;

            // If product doesn't have images, add the logo as fallback
            if (this.product && (!this.product.productImages || this.product.productImages.length === 0)) {
              this.product.productImages = [];
              // Add fallback image if needed
              if (this.product.logo) {
                this.product.productImages.push(this.product.logo);
              }
            }
          },
          error: (err) => {
            console.error('Error loading product:', err);
            this.error = 'Failed to load product details. Please try again.';
            this.isLoading = false;
          }
        });
    }
  }

  getImagePath(imageName: string): string {
    // Handle undefined case
    if (!imageName) {
      return this.defaultImage;
    }

    // Check if the path already contains the storage URL
    if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
      return imageName;
    }

    // For paths stored by Laravel, they'll be in the storage folder
    if (imageName.includes('logos/') || imageName.includes('product_images/')) {
      return this.apiUrl + `/storage/${imageName}`;
    }

    // Fallback to the assets folder for locally stored images
    return `../../assets/logos/products/${imageName}`;
  }

  updateDirection(lang: string) {
    this.documentDir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  handleImageError(event: any) {
    event.target.src = this.defaultImage;
  }
}
