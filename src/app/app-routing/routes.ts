import { Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { DishDetailComponent } from '../dish-detail/dish-detail.component';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dishdetail/:id', component: DishDetailComponent },
  { path: 'contactus', component: ContactComponent },
  { path: 'menu', component: MenuComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "aboutus", component: AboutComponent },
];
