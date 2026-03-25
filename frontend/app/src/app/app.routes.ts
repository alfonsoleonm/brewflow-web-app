import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Menu } from './features/menu/menu';
import { Admin } from './features/admin/admin';
import { Checkout } from './features/checkout/checkout';
import { Confirmation } from './features/confirmation/confirmation';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'menu', component: Menu },
  { path: 'checkout', component: Checkout },
  { path: 'confirmation', component: Confirmation },
  { path: 'admin', component: Admin },
];