import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { MenuComponent } from './features/menu/menu';
import { AdminComponent } from './features/admin/admin';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'admin', component: AdminComponent },
];
