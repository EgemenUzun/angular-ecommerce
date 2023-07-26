import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WebSocketService } from '../../services/web-socket.service';
import { of } from 'rxjs';

fdescribe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let route: ActivatedRoute;
  let cartService: jasmine.SpyObj<CartService>;
  let webSocketService: jasmine.SpyObj<WebSocketService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProductListPaginate']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);
    const webSocketServiceSpy = jasmine.createSpyObj('WebSocketService', ['getSocket']);

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ActivatedRoute, useValue: { paramMap: of({ has: () => false }) } },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: WebSocketService, useValue: webSocketServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    route = TestBed.inject(ActivatedRoute);
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    webSocketService = TestBed.inject(WebSocketService) as jasmine.SpyObj<WebSocketService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listProducts on ngOnInit', () => {
    spyOn(component, 'listProducts');
    webSocketService.getSocket.and.returnValue({
      addEventListener: (eventName: string, callback: any) => {
        // Call the callback function to simulate event
        callback({ data: 'New discount arrived for test@example.com' });
      },
    } as WebSocket);
    fixture.detectChanges();
    expect(component.listProducts).toHaveBeenCalled();
  });

  it('should call handleListProducts when route has categoryId', () => {
    const testCategoryId = 1;
  

    spyOn(component, 'handleListProducts');
    webSocketService.getSocket.and.returnValue({
      addEventListener: (eventName: string, callback: any) => {
        // Call the callback function to simulate event
        callback({ data: 'New discount arrived for test@example.com' });
      },
    } as WebSocket);
    fixture.detectChanges();
    expect(component.currentCategoryId).toEqual(testCategoryId);
  });



});
