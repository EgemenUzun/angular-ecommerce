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

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor() { }
  
   sendLoginPage(oktaAuth:OktaAuth,injector:Injector){
    // Use injector to access any service available within your application
    const router = injector.get(Router);
    // Redircet the user to your custom login page
    router.navigate(['/login']);
  }
    private routes: Routes = [
    {path: 'order-hostory', component: OrderHistoryComponent,canActivate:[OktaAuthGuard],data:{onAuthRequired: this.sendLoginPage}},
  
    {path: 'members', component: MambersPageComponent ,canActivate:[OktaAuthGuard],data:{onAuthRequired: this.sendLoginPage}},
  
    {path: 'login/callback', component: OktaCallbackComponent},
    {path: 'login', component: LoginComponent},
    
    {path: 'checkout', component: CheckoutComponent},
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
