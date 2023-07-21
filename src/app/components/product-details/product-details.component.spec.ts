import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Product } from 'src/app/common/product';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductDetailsComponent } from './product-details.component';

fdescribe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const productServiceMock = jasmine.createSpyObj('ProductService', ['getProduct']);
    const cartServiceMock = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } } },
      ],
    }).compileComponents();

    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /*it('should retrieve product details on ngOnInit', () => {
    const mockProduct: Product = { id: '1', name: 'Product A', imageUrl: 'image-url', unitPrice: 100 };
    productServiceSpy.getProduct.and.returnValue(of(mockProduct));

    component.ngOnInit();

    expect(productServiceSpy.getProduct).toHaveBeenCalledWith(1);
    expect(component.product).toEqual(mockProduct);
  });*/

  it('should add product to cart on addToCart', () => {
    const mockProduct: Product = { id: '1', name: 'Product A', imageUrl: 'image-url', unitPrice: 100 };
    component.product = mockProduct;

    component.addToCart();

    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(new CartItem('1', 'Product A', 'image-url', 100));
  });
});
