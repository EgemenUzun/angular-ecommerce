import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

fdescribe('ProductService', () => {
  let httpController: HttpTestingController;
  let service: ProductService;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],
      providers: [ProductService]})
      service = TestBed.inject(ProductService);
      httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get product',()=>{
    let prodcut:Product= {id:'1',sku:'a',name:'b',description:'c',unitPrice:10,imageUrl:'d',active:true,unitsInStock:10,dateCreated:new Date(),lastUpdated:new Date()};
    service.getProduct(1).subscribe(data=>{
      expect(data).toBe(prodcut);
    });
    const req = httpController.expectOne('http://localhost:8080/api/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(prodcut);
  });
  it('should fetch a list of products by category id using pagination', () => {
    const categoryId = 1;
    const mockProducts: Product[] = [
      { id:'1',sku:'a',name:'b',description:'c',unitPrice:10,imageUrl:'d',active:true,unitsInStock:10,dateCreated:new Date(),lastUpdated:new Date()}];
    const mockResponse: GetResponseProducts = {
      _embedded: { products: mockProducts },
      page: { size: 2, totalElements: 2, totalPages: 1, number: 0 },
    };

    service.getProductListPaginate(0, 2, categoryId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const searchUrl = `${service.baseUrl}/search/findByCategoryId?id=${categoryId}&page=0&size=2`;
    const req = httpController.expectOne(searchUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch a list of products by category id', () => {
    const categoryId = 1;
    const mockProducts: Product[] = [
      { id:'1',sku:'a',name:'b',description:'c',unitPrice:10,imageUrl:'d',active:true,unitsInStock:10,dateCreated:new Date(),lastUpdated:new Date()}];

    service.getProductList(categoryId).subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const searchUrl = `${service.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    const req = httpController.expectOne(searchUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ _embedded: { products: mockProducts } });
  });

  it('should search for products by keyword using pagination', () => {
    const keyword = 'product';
    const mockResponse: GetResponseProducts = {
      _embedded: { products: [] },
      page: { size: 0, totalElements: 0, totalPages: 0, number: 0 },
    };

    service.searchProductsPaginate(0, 2, keyword).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const searchUrl = `${service.baseUrl}/search/findByNameContaining?name=${keyword}&page=0&size=2`;
    const req = httpController.expectOne(searchUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should search for products by keyword', () => {
    const keyword = 'product';
    const mockProducts: Product[] = [
      { id:'1',sku:'a',name:'b',description:'c',unitPrice:10,imageUrl:'d',active:true,unitsInStock:10,dateCreated:new Date(),lastUpdated:new Date()}];

    service.searchProducts(keyword).subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const searchUrl = `${service.baseUrl}/search/findByNameContaining?name=${keyword}`;
    const req = httpController.expectOne(searchUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ _embedded: { products: mockProducts } });
  });

  it('should fetch a list of product categories from the API', () => {
    const mockCategories: ProductCategory[] = [{ id: 1, categoryName: 'Category A' }];

    service.getProductCategories().subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpController.expectOne(service.categoryUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ _embedded: { productCategory: mockCategories } });
  });

  it('Should get discounted product',()=>{
    let prodcut:Product= {id:'1',sku:'a',name:'b',description:'c',unitPrice:10,imageUrl:'d',active:true,unitsInStock:10,dateCreated:new Date(),lastUpdated:new Date()};
    service.getProductwithDiscount().subscribe(data=>{
      expect(data).toBe(prodcut);
    });
    const req = httpController.expectOne(service.discountUrl);
    expect(req.request.method).toBe('GET');
    req.flush(prodcut);
  });

});
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}