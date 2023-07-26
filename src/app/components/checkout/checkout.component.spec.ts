import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { CheckoutComponent } from './checkout.component';
import { Country } from '../../common/country';
import { of } from 'rxjs';
import { Address } from '../../common/address';

fdescribe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let formSerivce: Luv2ShopFormService;
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
    formSerivce = TestBed.inject(Luv2ShopFormService);
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
    component.firstName?.setValue('test');
    component.lastName?.setValue('test');
    component.email?.setValue('test@test.com');

    spyOn(component, 'onSubmit');
    component.onSubmit();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should shipping adderss and billing address equal',()=>{
    
    component.copyShippingAddressToBillingAddress(true);
    expect(component.billingAddressStates).toBe(component.shippingAddressStates);
  });

  it('should shipping adderss and billing address not equal',()=>{
    component.copyShippingAddressToBillingAddress(true);
    expect(component.billingAddressStates).not.toBe(component.shippingAddressStates);

  });

});
