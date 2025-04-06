import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Product, products } from '../data/product';

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

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService
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
      this.product = products.find(p => p.id === this.productId);

      // If product doesn't have images, we could add fallback logic here
      if (this.product && !this.product.productImages) {
        this.product.productImages = [];
        // Add fallback image if needed
        if (this.product.logo) {
          this.product.productImages.push(this.product.logo);
        }
      }
    }
  }

  getImagePath(imageName: string): string {
    return `../../assets/logos/products/${imageName}`;
  }

  updateDirection(lang: string) {
    this.documentDir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  handleImageError(event: any) {
    event.target.src = this.defaultImage;
  }
}
