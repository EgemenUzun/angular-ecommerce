import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { LoginComponent } from './components/login/login.component';
import { MambersPageComponent } from './components/mambers-page/mambers-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './services/web-socket.service';
import { AuthService } from './services/auth.service';
import { BehaviorSubject, Subject, of } from 'rxjs';

fdescribe('AppComponent', () => {

  let fixture : ComponentFixture<AppComponent>;
  let component :AppComponent;
  let ws:WebSocketService;
  let isValid = new Subject<boolean>();
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let webSocketServiceSpy: jasmine.SpyObj<WebSocketService>;

  beforeEach(async () => {
    const webSocketServiceMock = jasmine.createSpyObj('WebSocketService', ['getSocket']);
    const authServiceMock = jasmine.createSpyObj('AuthService', ['logout']);
    await TestBed.configureTestingModule({
      declarations: [AppComponent,ProductListComponent,
        ProductCategoryMenuComponent,
        SearchComponent,
        ProductDetailsComponent,
        CartStatusComponent,
        CartDetailsComponent,
        CheckoutComponent,
        LoginComponent,
        LoginStatusComponent,
        MambersPageComponent,
        OrderHistoryComponent,
        RegisterComponent,
        ],
      imports: [HttpClientTestingModule,RouterOutlet],
      providers: [AuthService,{ provide: WebSocketService, useValue: webSocketServiceMock },
      { provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();
  });



  beforeEach(() =>{
  fixture = TestBed.createComponent(AppComponent);
  ws = TestBed.inject(WebSocketService);
  component = fixture.componentInstance;
  authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  authServiceSpy.isValid = isValid;
  webSocketServiceSpy = TestBed.inject(WebSocketService) as jasmine.SpyObj<WebSocketService>;
  
});

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angular-ecommerce'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-ecommerce');
  });

  it('test_notification_false_when_new_discount_arrived_for_other_user', () => {
    spyOn(component.storage, 'getItem').and.returnValue('current_user');

    

    authServiceSpy.isValid.subscribe(data=>{
      expect(data).toBe(true);
      expect(data).toBe(component.isAuthenticated)
    });
    
    webSocketServiceSpy.getSocket.and.returnValue({
      addEventListener: (eventName: string, callback: any) => {
        callback({ data: 'New discount arrived for other_user' });
      },
    } as WebSocket);
    component.ngOnInit();

    expect(component.notification).toBeFalse();
  });

  it('test_notification_true_when_new_discount_arrived_for_other_user', () => {
    spyOn(component.storage, 'getItem').and.returnValue('current_user');
    authServiceSpy.isValid.subscribe(data=>{
      expect(data).toBe(true);
      expect(data).toBe(component.isAuthenticated)
    });
    
    webSocketServiceSpy.getSocket.and.returnValue({
      addEventListener: (eventName: string, callback: any) => {
        callback({ data: 'New discount arrived for current_user' });
      },
    } as WebSocket);

    component.ngOnInit();

    expect(component.notification).toBeTrue();
  });

  it('test_notification_false_when_new_discount_arrived_for_no_user', () => {
    spyOn(component.storage, 'getItem').and.returnValue('no_user');
    authServiceSpy.isValid.subscribe(data=>{
      expect(data).toBe(false);
      expect(data).toBe(component.isAuthenticated)
    });
    
    webSocketServiceSpy.getSocket.and.returnValue({
      addEventListener: (eventName: string, callback: any) => {
        callback({ data: 'New discount arrived for current_user' });
      },
    } as WebSocket);

    component.ngOnInit();
    expect(component.notification).toBe(false);
  });

  

});
