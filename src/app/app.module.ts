import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule, Router} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG, 
  OktaAuthGuard
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

import myAppConfig from './config/my-app-config';
import { MambersPageComponent } from './components/mambers-page/mambers-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { RouteService } from './services/route.service';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

export function callRoutes():Routes{
  const routeService = new RouteService();
  return routeService.getRoutes();
}

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MambersPageComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(callRoutes()),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [RouteService,ProductService, { provide: OKTA_CONFIG, useValue: { oktaAuth }},{provide:HTTP_INTERCEPTORS , useClass :AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
