import { TestBed } from '@angular/core/testing';

import { CheckoutService } from './checkout.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Purchase } from '../common/purchase';

fdescribe('CheckoutService', () => {
  let service: CheckoutService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(CheckoutService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should placeOrder',(done:DoneFn)=>{
    const dummyModel ={
      orderTrackingNumber:'tracker_number'
    };
    let body = new Purchase();
    service.placeOrder(body).subscribe(data=>{
      expect(data).toBe(dummyModel);
      done();
    });
    const req = httpController.expectOne(`${service.purchaseUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyModel);
  });
});
