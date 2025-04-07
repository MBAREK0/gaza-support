import { Routes } from '@angular/router';
import {LetterComponent} from "./letter/letter.component";
import {IsraeliProductsComponent} from "./israeli-products/israeli-products.component";
import {SocietiesComponent} from "./societies/societies.component";
import {ProductDetailComponent} from "./israeli-products/product-detail/product-detail.component";
import {ProductListComponent} from "./israeli-products/product-list/product-list.component";

export const routes: Routes = [

  {
    component: LetterComponent,
    path: '',

  },
  {
    component: IsraeliProductsComponent,
    path: 'boycott-products',
  },
  {
    component : SocietiesComponent,
    path : 'societies'
  },
  { path: 'product/:id', component: ProductDetailComponent },
  {
    path: 'upload-product-d7cb80ab-85ac-4d0e-8b5a-ac6f39b89ca5',
    loadComponent: () => import('./israeli-products/product-upload/product-upload.component').then(c => c.ProductUploadComponent)
  },
  { path: 'products-d7cb80ab-85ac-4d0e-8b5a-ac6f39b89ca5', component: ProductListComponent },
  {
    path: '**',
    redirectTo: ''
  }

];
