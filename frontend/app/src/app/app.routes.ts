import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Menu } from './features/menu/menu';
import { Admin } from './features/admin/admin';


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'menu', component: Menu },
    { path: 'admin', component: Admin },
];
