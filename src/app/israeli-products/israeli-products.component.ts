import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {RouterLink} from "@angular/router";

interface Product {
  id: number;
  name: string;
  category: string;
  alternativeBrands?: string[];
  logo?: string;
  description?: string;
}

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

  products: Product[] = [
    {
      id: 1,
      name: "Sabra",
      category: "food",
      alternativeBrands: ["Local hummus brands", "Homemade hummus"],
      logo: "assets/logos/sabra.jpg",
      description: "Hummus, dips, and spreads"
    },
    {
      id: 2,
      name: "SodaStream",
      category: "beverages",
      alternativeBrands: ["Regular bottled sparkling water", "Manual soda makers"],
      logo: "assets/logos/sodastream.jpg",
      description: "Home carbonation products"
    },
    {
      id: 3,
      name: "Ahava",
      category: "cosmetics",
      alternativeBrands: ["Local organic skincare", "Non-Israeli international brands"],
      logo: "assets/logos/ahava.jpg",
      description: "Dead Sea cosmetics and skincare"
    },
    {
      id: 4,
      name: "Teva Pharmaceutical",
      category: "pharmaceuticals",
      alternativeBrands: ["Generic alternatives (consult doctor)", "Local pharmaceutical companies"],
      logo: "assets/logos/teva.jpg",
      description: "Generic and specialty medications"
    },
    {
      id: 5,
      name: "Medjool Date Farms",
      category: "food",
      alternativeBrands: ["Dates from Morocco, Tunisia, Algeria", "Local date producers"],
      description: "Dates from occupied territories"
    },
    {
      id: 6,
      name: "Strauss Group",
      category: "food",
      alternativeBrands: ["Local dairy and coffee brands"],
      logo: "assets/logos/strauss.jpg",
      description: "Dairy products, coffee, snacks"
    },
    {
      id: 7,
      name: "Wix",
      category: "technology",
      alternativeBrands: ["WordPress", "Shopify", "Squarespace"],
      logo: "assets/logos/wix.jpg",
      description: "Website building platform"
    },
    {
      id: 8,
      name: "Stanley Black & Decker",
      category: "tools",
      alternativeBrands: ["Bosch", "Makita", "DeWalt"],
      logo: "assets/logos/stanley.jpg",
      description: "Tools and home improvement products with Israeli subsidiaries"
    },
    {
      id: 9,
      name: "Puma",
      category: "clothing",
      alternativeBrands: ["Adidas", "Nike", "Local sports brands"],
      logo: "assets/logos/puma.jpg",
      description: "Sportswear sponsor of the Israel Football Association"
    },
    {
      id: 10,
      name: "HP (Hewlett Packard)",
      category: "technology",
      alternativeBrands: ["Lenovo", "Dell", "Acer"],
      logo: "assets/logos/hp.jpg",
      description: "Computers and technology services to Israeli government"
    }
  ];

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
