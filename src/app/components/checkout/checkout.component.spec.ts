import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { CartService } from 'src/app/services/cart.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule],
      declarations: [CheckoutComponent],
      providers: [CartService,Luv2ShopFormService,CheckoutService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.checkoutFormGroup).toBeDefined();
    expect(component.firstName).toBeDefined();
    expect(component.lastName).toBeDefined();
    expect(component.email).toBeDefined();
  });

  it('should validate form controls', () => {
    component.firstName?.setValue('');
    component.lastName?.setValue('');
    component.email?.setValue('invalid-email');

    fixture.detectChanges();

    expect(component.firstName?.invalid).toBeTruthy();
    expect(component.lastName?.invalid).toBeTruthy();
    expect(component.email?.invalid).toBeTruthy();
  });

  it('should call onSubmit when form is valid', () => {
    component.firstName?.setValue('test');
    component.lastName?.setValue('test');
    component.email?.setValue('test@test.com');

    spyOn(component, 'onSubmit');
    component.onSubmit();

    expect(component.onSubmit).toHaveBeenCalled();
  });

});
