import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartStatusComponent } from './cart-status.component';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

fdescribe('CartStatusComponent', () => {
  let component: CartStatusComponent;
  let fixture: ComponentFixture<CartStatusComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartStatusComponent],
      providers: [CartService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartStatusComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    const mockCartItems: CartItem[] = [
      { id: '1', name: 'Product A', quantity: 2, unitPrice: 10 },
      { id: '2', name: 'Product B', quantity: 1, unitPrice: 20 },
    ];

    cartService.cartItems = mockCartItems;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update cart status',()=>{
    cartService.totalPrice.subscribe(data=>expect(data).toBe(component.totalPrice));
    cartService.totalQuantity.subscribe(data=>expect(data).toBe(component.totalQuantity));

    cartService.addToCart(cartService.cartItems[0]);
  })
});
