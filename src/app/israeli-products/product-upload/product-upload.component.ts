import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {environment} from "../../../environment";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './product-upload.component.html',
  styleUrl: './product-upload.component.css'
})
export class ProductUploadComponent {
  @Output() uploadComplete = new EventEmitter<void>();

  selectedLang = 'en';
  documentDir = 'ltr';

  productForm: FormGroup;
  categories: string[] = ['food', 'beverages', 'cosmetics', 'pharmaceuticals', 'technology', 'tools', 'clothing'];
  logoFile: File | null = null;
  productImages: File[] = [];
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error' = 'idle';
  errorMessage = '';

  // Max file size in bytes (2MB)
  maxFileSize = 2 * 1024 * 1024;
  validationErrors: string[] = [];
  apiUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private translate: TranslateService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      alternative_brands: ['']
    });
  }

  onLogoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];

      // Check file size
      if (file.size > this.maxFileSize) {
        this.validationErrors.push(`Logo file size exceeds 2MB limit`);
        this.logoFile = null;
        return;
      }

      this.logoFile = file;
      this.validationErrors = this.validationErrors.filter(err => !err.includes('Logo'));
    }
  }

  onProductImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      // Clear previous size errors
      this.validationErrors = this.validationErrors.filter(err => !err.includes('product image'));

      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];

        // Check file size
        if (file.size > this.maxFileSize) {
          this.validationErrors.push(`Product image "${file.name}" exceeds 2MB limit`);
          continue;
        }

        this.productImages.push(file);
      }
    }
  }

  removeProductImage(index: number) {
    this.productImages.splice(index, 1);
  }

  async onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    this.uploadStatus = 'uploading';
    this.validationErrors = [];

    try {
      // Process form data
      const formData = new FormData();

      // Add form fields
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('category', this.productForm.get('category')?.value);

      if (this.productForm.get('description')?.value) {
        formData.append('description', this.productForm.get('description')?.value);
      }

      // Process alternative brands (split by comma)
      const alternativeBrandsString = this.productForm.get('alternative_brands')?.value;
      if (alternativeBrandsString) {
        const alternativeBrands = alternativeBrandsString.split(',').map((brand: string) => brand.trim());

        // Add each brand as an array item for Laravel
        alternativeBrands.forEach((brand: string, index: number) => {
          formData.append(`alternative_brands[${index}]`, brand);
        });
      }

      // Add logo file if present
      if (this.logoFile) {
        formData.append('logo', this.logoFile);
      }

      // Add product images
      this.productImages.forEach((file, index) => {
        formData.append(`product_images[${index}]`, file);
      });

      // Send data to Laravel API endpoint
      const response = await this.http.post<{id: number, name: string}>(this.apiUrl + '/api/products', formData).toPromise();

      // Reset form on success
      this.productForm.reset();
      this.logoFile = null;
      this.productImages = [];
      this.uploadStatus = 'success';

      // Emit event to notify parent component
      setTimeout(() => {
        this.uploadComplete.emit();
      }, 2000);

    } catch (error: any) {
      console.error('Error uploading product:', error);
      this.uploadStatus = 'error';

      // Handle Laravel validation errors
      if (error.error && error.error.errors) {
        const errorMessages = [];
        for (const field in error.error.errors) {
          errorMessages.push(...error.error.errors[field]);
        }
        this.errorMessage = errorMessages.join(', ');
      } else {
        this.errorMessage = 'Failed to upload product. Please try again.';
      }
    }
  }
}
