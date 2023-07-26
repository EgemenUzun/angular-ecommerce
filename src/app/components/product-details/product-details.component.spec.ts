import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../common/product';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductDetailsComponent } from './product-details.component';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const productServiceMock = jasmine.createSpyObj('ProductService', ['getProduct']);
    const cartServiceMock = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: CartService, useValue: cartServiceMock },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();

    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    route = TestBed.inject(ActivatedRoute)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Tests that ngOnInit subscribes to the paramMap observable
  it('test_subscribe_to_paramMap_observable', () => {
     const mockProduct: Product = { id: '1', name: 'Product A', imageUrl: 'image-url', unitPrice: 100 };
    spyOn(route.paramMap, 'subscribe').and.callThrough();
    productServiceSpy.getProduct.and.returnValue(of(mockProduct));
    component.ngOnInit();
    expect(component.product).toBe(mockProduct);
    expect(route.paramMap.subscribe).toHaveBeenCalled();
  });


  it('should add product to cart on addToCart', () => {
    const mockProduct: Product = { id: '1', name: 'Product A', imageUrl: 'image-url', unitPrice: 100 };
    component.product = mockProduct;

    component.addToCart();

    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(new CartItem('1', 'Product A', 'image-url', 100));
  });
});
