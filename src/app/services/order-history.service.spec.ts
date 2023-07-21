import { TestBed } from '@angular/core/testing';

import { OrderHistoryService } from './order-history.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderHistory } from '../common/order-history';

fdescribe('OrderHistoryService', () => {
  let service: OrderHistoryService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],
      providers: [ OrderHistoryService]});
    service = TestBed.inject(OrderHistoryService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get order histories',()=>{
    let orederHistories: OrderHistory[] = [{id:'1',orderTrackingNumber:'trackernumber',totalPrice:10,totalQuantity:2,dateCreated:new Date()}];
    service.getOrderHistory('testmail@gmail.com').subscribe(data=>{
      expect(data).toBe(orederHistories);
    });
    const req = httpController.expectOne('http://localhost:8080/api/orders/search/findByCustomerEmailOrderByDateCreatedDesc?email=testmail@gmail.com');
    expect(req.request.method).toBe('GET');
    req.flush({ _embedded: { orders: orederHistories } });
  });

});
