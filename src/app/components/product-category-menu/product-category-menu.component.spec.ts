import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategoryMenuComponent } from './product-category-menu.component';

fdescribe('ProductCategoryMenuComponent', () => {
  let component: ProductCategoryMenuComponent;
  let fixture: ComponentFixture<ProductCategoryMenuComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceMock = jasmine.createSpyObj('ProductService', ['getProductCategories']);

    await TestBed.configureTestingModule({
      declarations: [ProductCategoryMenuComponent],
      providers: [{ provide: ProductService, useValue: productServiceMock }],
    }).compileComponents();

    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve product categories on ngOnInit', () => {
    const mockProductCategories: ProductCategory[] = [
      { id: 1, categoryName: 'Category A' },
      { id: 2, categoryName: 'Category B' },
    ];

    productServiceSpy.getProductCategories.and.returnValue(of(mockProductCategories));

    component.ngOnInit();

    expect(productServiceSpy.getProductCategories).toHaveBeenCalled();
    expect(component.productCategories).toEqual(mockProductCategories);
  });
});
