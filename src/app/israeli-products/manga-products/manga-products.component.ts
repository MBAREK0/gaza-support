import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from "@angular/router";
import { ProductItem } from "../../models/ProductItem";
import { PRODUCT_ITEMS } from "../../data/PRODUCT_ITEMS";
import {HadithComponent} from "../../hadith/hadith.component";

@Component({
  selector: 'app-manga-products',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, RouterLink, HadithComponent],
  templateUrl: './manga-products.component.html',
  styleUrl: './manga-products.component.css'
})
export class MangaProductsComponent implements OnInit {
  selectedLang = 'ar';
  documentDir = 'ltr';

  searchTerm = '';
  selectedCategory = 'all';

  categories: string[] = [];
  filteredProducts: ProductItem[] = [];
  groupedProducts: Map<string, ProductItem[]> = new Map();
  products: ProductItem[] = [];

  isLoading = true;

  constructor(
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use(this.selectedLang);
    this.updateDirection(this.selectedLang);
  }

  ngOnInit() {
    // Call loadProducts immediately on init
    this.loadProducts();

    // Force the initial load of all products
    setTimeout(() => {
      this.filterProducts();
    }, 100);
  }

  loadProducts() {
    this.isLoading = true;

    // Load products from the local data file
    this.products = PRODUCT_ITEMS;

    // Extract unique categories
    this.categories = ['all', ...new Set(this.products.map(p => p.category))];

    // Apply initial filtering
    this.filterProducts();

    this.isLoading = false;
  }

  groupProducts() {
    this.groupedProducts.clear();

    // Ensure we're working with the filtered products
    this.filteredProducts.forEach(product => {
      if (!this.groupedProducts.has(product.category)) {
        this.groupedProducts.set(product.category, []);
      }
      this.groupedProducts.get(product.category)?.push(product);
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
    if (this.searchTerm === '' && this.selectedCategory === 'all') {
      // Show all products when no filters are applied
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product => {
        // Filter by search term
        const matchesSearch = this.searchTerm === '' ||
          product.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          (product.products && product.products.some(p =>
            p.toLowerCase().includes(this.searchTerm.toLowerCase())
          ));

        // Filter by category
        const matchesCategory = this.selectedCategory === 'all' ||
          product.category === this.selectedCategory;

        return matchesSearch && matchesCategory;
      });
    }

    // Regroup the filtered products
    this.groupProducts();
  }

  getImagePath(imagePath: string): string {
    if (!imagePath) {
      return 'assets/images/placeholder.jpg';
    }

    // Ensure the path is correct by removing any relative path parts
    return `../../assets/images/${imagePath.replace(/^(\.\.\/)+/g, '')}`;
  }

  protected readonly Array = Array;
}
