import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {RouterLink} from "@angular/router";
import {Product, products} from "./data/product";


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

  products: Product[] = products;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use(this.selectedLang);
    this.updateDirection(this.selectedLang);
  }

  ngOnInit() {
    // Extract unique categories
    this.categories = ['all', ...new Set(this.products.map(p => p.category))];
    this.filteredProducts = [...this.products];
  }

  switchLang(lang: string) {
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
}
