import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import {Product} from "../../models/product";
import {ProductUploadComponent} from "../product-upload/product-upload.component";
import {environment} from "../../../environment";


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, TranslatePipe, FormsModule, ProductUploadComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedLang = 'en';
  documentDir = 'ltr';
  isLoading = true;
  error = '';
  showUploadModal = false;
  deleteInProgress: number | null = null;
  deleteStatus: 'idle' | 'success' | 'error' = 'idle';
  deleteError = '';
  apiUrl =  environment.apiUrl;

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use(this.selectedLang);
    this.updateDirection(this.selectedLang);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.updateDirection(lang);
  }

  updateDirection(lang: string) {
    this.documentDir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', this.documentDir);
    document.body.setAttribute('dir', this.documentDir);

    if (lang === 'ar') {
      document.body.classList.add('rtl-language');
    } else {
      document.body.classList.remove('rtl-language');
    }
  }

  loadProducts() {
    this.isLoading = true;
    this.error = '';

    this.http.get<Product[]>(this.apiUrl + '/api/products')
      .subscribe({
        next: (data) => {
          this.products = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading products:', err);
          this.error = 'Failed to load products. Please try again.';
          this.isLoading = false;
        }
      });
  }

  openUploadModal() {
    this.showUploadModal = true;
    // Add a class to prevent scrolling on the body
    document.body.classList.add('modal-open');
  }

  closeUploadModal() {
    this.showUploadModal = false;
    // Remove the class to re-enable scrolling
    document.body.classList.remove('modal-open');
    // Reload products to show newly added items
    this.loadProducts();
  }

  async deleteProduct(id: number) {
    if (confirm(this.translate.instant('productList.confirmDelete'))) {
      this.deleteInProgress = id;
      this.deleteStatus = 'idle';
      this.deleteError = '';

      try {
        await this.http.delete(this.apiUrl + `/api/products/${id}`).toPromise();
        this.deleteStatus = 'success';

        // Remove the deleted product from the array
        this.products = this.products.filter(product => product.id !== id);

        // Reset status after 3 seconds
        setTimeout(() => {
          this.deleteInProgress = null;
          this.deleteStatus = 'idle';
        }, 3000);

      } catch (error: any) {
        console.error('Error deleting product:', error);
        this.deleteStatus = 'error';
        this.deleteError = 'Failed to delete product. Please try again.';

        // Reset status after 3 seconds
        setTimeout(() => {
          this.deleteInProgress = null;
          this.deleteStatus = 'idle';
          this.deleteError = '';
        }, 3000);
      }
    }
  }
}
