import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl='http://localhost:8080/api/orders';
  constructor(private httpClient:HttpClient) { }
  getOrderHistory(theEmail:string):Observable<OrderHistory[]>{
    //need to build url based on the customer email
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl).pipe(
      map(response => response._embedded.orders));
  }
}

interface GetResponseOrderHistory{
  _embedded:{
    orders:OrderHistory[];
  }
}