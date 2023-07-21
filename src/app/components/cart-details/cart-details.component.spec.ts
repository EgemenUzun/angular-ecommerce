import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailsComponent } from './cart-details.component';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

fdescribe('CartDetailsComponent', () => {
  let component: CartDetailsComponent;
  let fixture: ComponentFixture<CartDetailsComponent>;
  let cartService: CartService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartDetailsComponent],
      providers: [CartService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService)
    
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


  it('should list cart details',()=>{
    component.listCartDetails();
    expect(component.cartItems.length).toBe(2);
    expect(component.totalPrice).toBe(40);
    expect(component.totalQuantity).toBe(3);
  });

  it('should increment quantity',()=>{
    component.incrementQuantity(component.cartItems[0]);
    expect(component.totalPrice).toBe(50);
    expect(component.totalQuantity).toBe(4);
    expect(component.cartItems.length).toBe(2);
  });
 
  it('should remove cart item',()=>{
    component.remove(component.cartItems[0]);
    expect(component.totalPrice).toBe(20);
    expect(component.totalQuantity).toBe(1);
    expect(component.cartItems.length).toBe(1);
  });
   it('should decrement quantity',()=>{
    component.decrementQuantity(component.cartItems[0]);
    expect(component.totalPrice).toBe(30);
    expect(component.totalQuantity).toBe(2);
    expect(component.cartItems.length).toBe(2);
  });
});
