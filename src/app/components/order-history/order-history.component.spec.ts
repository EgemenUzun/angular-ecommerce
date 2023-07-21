import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { OrderHistoryComponent } from './order-history.component';

fdescribe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let orderHistoryServiceSpy: jasmine.SpyObj<OrderHistoryService>;

  beforeEach(async () => {
    const orderHistoryServiceMock = jasmine.createSpyObj('OrderHistoryService', ['getOrderHistory']);

    await TestBed.configureTestingModule({
      declarations: [OrderHistoryComponent],
      providers: [{ provide: OrderHistoryService, useValue: orderHistoryServiceMock }],
    }).compileComponents();

    orderHistoryServiceSpy = TestBed.inject(OrderHistoryService) as jasmine.SpyObj<OrderHistoryService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve order history on ngOnInit', () => {
    const mockOrderHistory: OrderHistory[] = [
      { id: '1', orderTrackingNumber: 'ABC123', totalQuantity: 3, totalPrice: 25.99,dateCreated: new Date() },
      { id: '2', orderTrackingNumber: 'XYZ456', totalQuantity: 2, totalPrice: 15.49,dateCreated: new Date() },
    ];
    const userEmail = 'test@example.com';

    orderHistoryServiceSpy.getOrderHistory.and.returnValue(of(mockOrderHistory));
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(userEmail));

    component.ngOnInit();

    expect(orderHistoryServiceSpy.getOrderHistory).toHaveBeenCalledWith(userEmail);
    expect(component.orderHistoryList).toEqual(mockOrderHistory);
  });
});
