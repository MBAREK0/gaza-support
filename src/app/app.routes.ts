import { Routes } from '@angular/router';
import {LetterComponent} from "./letter/letter.component";
import {IsraeliProductsComponent} from "./israeli-products/israeli-products.component";
import {SocietiesComponent} from "./societies/societies.component";
import {ProductDetailComponent} from "./israeli-products/product-detail/product-detail.component";

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
];
