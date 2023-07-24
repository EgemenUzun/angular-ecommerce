import { Injectable, Injector } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { OrderHistoryComponent } from '../components/order-history/order-history.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { CartDetailsComponent } from '../components/cart-details/cart-details.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { LoginComponent } from '../components/login/login.component';
import { MambersPageComponent } from '../components/mambers-page/mambers-page.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import OktaAuth from '@okta/okta-auth-js';
import { RegisterComponent } from '../components/register/register.component';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor() { }
  
    private routes: Routes = [
    {path: 'order-hostory', component: OrderHistoryComponent,canActivate:[AuthGuardService]},
  
    {path: 'members', component: MambersPageComponent ,canActivate:[AuthGuardService]},
  
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    
    {path: 'checkout', component: CheckoutComponent,canActivate:[AuthGuardService]},
    {path: 'cart-details', component: CartDetailsComponent},
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: 'search/:keyword', component: ProductListComponent},
    {path: 'category/:id', component: ProductListComponent},
    {path: 'category', component: ProductListComponent},
    {path: 'products', component: ProductListComponent},
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: '**', redirectTo: '/products', pathMatch: 'full'}
  ];
  getRoutes():Routes{
    return this.routes;
  }
}
