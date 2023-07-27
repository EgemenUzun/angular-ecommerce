import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Country } from '../../common/country';
import { Purchase } from '../../common/purchase';
import { State } from '../../common/state';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { CheckoutComponent } from './checkout.component';

fdescribe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let formSerivce: Luv2ShopFormService;
  let checkoutService: CheckoutService;
  let cardService:CartService;
  let router: Router;
  beforeEach(async () => {
      await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule],
      declarations: [CheckoutComponent],
      providers: [CartService,CheckoutService,Luv2ShopFormService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    checkoutService = TestBed.inject(CheckoutService);
    formSerivce = TestBed.inject(Luv2ShopFormService);
    cardService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    component.creditCardMonths = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should get countries',()=>{
    const countries:Country[] =[{id:1,name:'USA',code:'USA'}]
    const months: number[] = [5,6,7,8,9,10,11,12];
    spyOn(formSerivce,'getCreditCardMonths').and.returnValue(of(months))
    spyOn(formSerivce,'getCountries').and.returnValue(of(countries))

    component.ngOnInit();
    expect(component.creditCardMonths).toBe(months);
    expect(component.countries).toBe(countries)
  });

  it('should call onSubmit when form is valid', () => {
    const mockResponse = { orderTrackingNumber: '123456' };
    const purchase:Purchase = new Purchase();

    spyOn(checkoutService, 'placeOrder').and.returnValue(of(mockResponse));
    spyOn(window, 'alert');
    spyOn(component.checkoutFormGroup,'get');
    spyOnProperty(component.checkoutFormGroup,'invalid').and.returnValue(false);
    spyOn(router,'navigateByUrl');

    component.firstName?.setValue('test');
    component.lastName?.setValue('test');
    component.email?.setValue('test@test.com');

    component.onSubmit();

    expect(component.checkoutFormGroup.invalid).toBe(false);
    expect(window.alert).toHaveBeenCalledWith(`Your order has been received.\nOrder tracking number: ${mockResponse.orderTrackingNumber}`);
    expect(cardService.cartItems).toEqual([]);
    expect(component.checkoutFormGroup.get).toHaveBeenCalled();
  });


  it('should call onSubmit when form is valid', () => { 
    spyOnProperty(component.checkoutFormGroup,'invalid').and.returnValue(true);
    component.onSubmit();
    expect(component.checkoutFormGroup.invalid).toBe(true);
  });
  it('should shipping adderss and billing address equal',()=>{
    const states:State[] = [{id:1,name:'Ankara'}];
    component.shippingAddressStates = states;
    component.copyShippingAddressToBillingAddress(true);
    expect(component.billingAddressStates).toBe(component.shippingAddressStates);
  });

  it('should shipping adderss and billing address not equal',()=>{
    const states:State[] = [{id:1,name:'Ankara'}];
    const statesB:State[] = [{id:2,name:'Istanbul'}];
    component.copyShippingAddressToBillingAddress(false);
    expect(component.billingAddressStates).not.toBe(component.shippingAddressStates);
  });

  it('should handle month and years /current year not equal the selected year',()=>{
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(currentYear+4);
    spyOn(component.checkoutFormGroup,'get')
    component.handleMonthsAndYears();
    expect(component.checkoutFormGroup.get).not.toBeNull
  });

});
