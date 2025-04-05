import { Routes } from '@angular/router';
import {LetterComponent} from "./letter/letter.component";
import {IsraeliProductsComponent} from "./israeli-products/israeli-products.component";

export const routes: Routes = [

  {
    component: LetterComponent,
    path: '',

  },
  {
    component: IsraeliProductsComponent,
    path: 'boycott-products',
  }
];
