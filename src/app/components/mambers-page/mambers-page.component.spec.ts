import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CartItem } from '../../common/cart-item';
import { Product } from '../../common/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { WebSocketService } from '../../services/web-socket.service';
import { MambersPageComponent } from './mambers-page.component';

fdescribe('MambersPageComponent', () => {
  let component: MambersPageComponent;
  let fixture: ComponentFixture<MambersPageComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let webSocketServiceSpy: jasmine.SpyObj<WebSocketService>;

  beforeEach(async () => {
    const productServiceMock = jasmine.createSpyObj('ProductService', ['getProductwithDiscount']);
    const cartServiceMock = jasmine.createSpyObj('CartService', ['addToCart']);
    const webSocketServiceMock = jasmine.createSpyObj('WebSocketService', ['getSocket']);

    await TestBed.configureTestingModule({
      declarations: [MambersPageComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: WebSocketService, useValue: webSocketServiceMock },
        { provide: ActivatedRoute, useValue: { paramMap: of({}) } },
      ],
    }).compileComponents();

    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    webSocketServiceSpy = TestBed.inject(WebSocketService) as jasmine.SpyObj<WebSocketService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MambersPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle discount and set product on ngOnInit', () => {
    const mockProduct: Product = { id: '1', name: 'Test Product', imageUrl: 'test.jpg', unitPrice: 9.99 };
    productServiceSpy.getProductwithDiscount.and.returnValue(of(mockProduct));
    spyOn(sessionStorage, 'getItem').and.returnValue('test@example.com');

    // Mock WebSocketService
    webSocketServiceSpy.getSocket.and.returnValue({
      addEventListener: (eventName: string, callback: any) => {
        // Call the callback function to simulate event
        callback({ data: 'New discount arrived for test@example.com' });
      },
    } as WebSocket);

    component.ngOnInit();

    expect(productServiceSpy.getProductwithDiscount).toHaveBeenCalled();
    expect(component.product).toEqual(mockProduct);
  });

  it('should add product to cart on addToCart()', () => {
    const mockProduct: Product = { id: '1', name: 'Test Product', imageUrl: 'test.jpg', unitPrice: 9.99 };
    component.product = mockProduct;

    component.addToCart();

    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(
      new CartItem(mockProduct.id, mockProduct.name, mockProduct.imageUrl, mockProduct.unitPrice)
    );
  });
});
