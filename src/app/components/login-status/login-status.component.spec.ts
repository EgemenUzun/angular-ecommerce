import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoginStatusComponent } from './login-status.component';
import { Router } from '@angular/router';

fdescribe('LoginStatusComponent', () => {
  let component: LoginStatusComponent;
  let fixture: ComponentFixture<LoginStatusComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let isvalid = new Subject<boolean>();
  let router:Router 

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['logout']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      declarations: [ LoginStatusComponent ],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStatusComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    authServiceSpy.isValid = isvalid;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAuthenticated to true and userFullName when user is authenticated', async () => {
    const mockUsername = 'testuser';
    spyOn(component.storage1, 'getItem').and.returnValue(mockUsername);
    component.ngOnInit();
    authServiceSpy.isValid.next(true);
    
    expect(component.isAuthenticated).toBe(true)
    expect(component.userFullName).toBe(mockUsername);
  });

  it('should set isAuthenticated to false and userFullName when user is authenticated', async () => {
    const mockUsername = '';
    spyOn(component.storage1, 'getItem').and.returnValue(mockUsername);
    component.ngOnInit();
    authServiceSpy.isValid.next(false);
    expect(component.isAuthenticated).toBe(false)
    expect(component.userFullName).toBe(mockUsername);
  });

  it('test_happy_path_logout', () => {
    spyOn(router,'navigateByUrl');
    component.logout();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/product');
    expect(authServiceSpy.logout).toHaveBeenCalled();
});

});
