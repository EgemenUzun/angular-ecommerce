import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { CartItem } from '../common/cart-item';

fdescribe('CartService', () => {
  let service: CartService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    service.cartItems =[];
    service.totalPrice.next(0);
    service.totalQuantity.next(0);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item to the cart', () => {
    const cartItem: CartItem = {
      id: '1',
      name: 'Product A',
      quantity: 1,
      unitPrice: 10.0,
    };

    service.addToCart(cartItem);
    service.totalPrice.subscribe(data => expect(data).toBe(10));
    service.totalQuantity.subscribe(data=>expect(data).toBe(1))
    expect(service.cartItems.length).toBe(1);
    expect(service.cartItems).toContain(cartItem);
  });

  it('should compute the cart totals',()=>{
    const cartItem: CartItem = {
      id: '1',
      name: 'Product A',
      quantity: 1,
      unitPrice: 10.0,
    };
    const cartItem2: CartItem = {
      id: '2',
      name: 'Product B',
      quantity: 3,
      unitPrice: 5.0,
    };
    spyOn(service,'logCartData');
    spyOn(service.storage,'setItem');
    
    service.addToCart(cartItem);
    service.addToCart(cartItem2);
    service.computeCartTotals();

    service.totalPrice.subscribe(data => expect(data).toBe(25));
    service.totalQuantity.subscribe(data=>expect(data).toBe(4))
    expect(service.cartItems.length).toBe(2);
    expect(service.logCartData).toHaveBeenCalledTimes(3);
    expect(service.storage.setItem).toHaveBeenCalledTimes(3);
    expect(service.storage.setItem).toHaveBeenCalledWith('cartItems',JSON.stringify(service.cartItems));
  });

  it('should decrementQuantity if not quantity equal to 0',()=>{
    const cartItem: CartItem = {
      id: '1',
      name: 'Product A',
      quantity: 2,
      unitPrice: 10.0,
    };
    spyOn(service,'remove');
    spyOn(service,'logCartData');
    spyOn(service.storage,'setItem');

    service.addToCart(cartItem)
    service.decrementQuantity(cartItem);

    service.totalQuantity.subscribe(data=>expect(data).toBe(1));
    service.totalPrice.subscribe(data => expect(data).toBe(10));
    expect(service.remove).toHaveBeenCalledTimes(0);
    expect(service.logCartData).toHaveBeenCalledTimes(2);
    expect(service.storage.setItem).toHaveBeenCalledTimes(2);
    expect(service.storage.setItem).toHaveBeenCalledWith('cartItems',JSON.stringify(service.cartItems));
 
  });

  it('should decrementQuantity if quantity equal to 0',()=>{
    const cartItem: CartItem = {
      id: '1',
      name: 'Product A',
      quantity: 1,
      unitPrice: 10.0,
    };
    spyOn(service,'logCartData');
    spyOn(service.storage,'setItem');
    
    service.addToCart(cartItem)
    service.decrementQuantity(cartItem);

    expect(service.cartItems.length).toBe(0);
    service.totalQuantity.subscribe(data=>expect(data).toBe(0));
    service.totalPrice.subscribe(data => expect(data).toBe(0));
    expect(service.logCartData).toHaveBeenCalledTimes(2);
    expect(service.storage.setItem).toHaveBeenCalledTimes(2);
    expect(service.storage.setItem).toHaveBeenCalledWith('cartItems',JSON.stringify(service.cartItems));
 
  });

  it('should selected item remove',()=>{
    const cartItem: CartItem = {
      id: '1',
      name: 'Product A',
      quantity: 5,
      unitPrice: 10.0,
    };
    spyOn(service,'logCartData');
    spyOn(service.storage,'setItem');

    service.addToCart(cartItem)
    service.remove(cartItem);

    expect(service.cartItems.length).toBe(0);
    service.totalQuantity.subscribe(data=>expect(data).toBe(0));
    service.totalPrice.subscribe(data => expect(data).toBe(0));
    expect(service.logCartData).toHaveBeenCalledTimes(2);
    expect(service.storage.setItem).toHaveBeenCalledTimes(2);
    expect(service.storage.setItem).toHaveBeenCalledWith('cartItems',JSON.stringify(service.cartItems));
 
  });

});
