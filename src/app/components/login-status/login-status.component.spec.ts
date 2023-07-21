import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStatusComponent } from './login-status.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('LoginStatusComponent', () => {
  let component: LoginStatusComponent;
  let fixture: ComponentFixture<LoginStatusComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  
  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['isAuth', 'logout']);
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAuthenticated to true and userFullName when user is authenticated', async () => {
    const mockUsername = 'testuser';
    authServiceSpy.isAuth.and.returnValue(Promise.resolve(true));
    spyOn(component.storage1, 'getItem').and.returnValue(mockUsername);

    await component.ngOnInit();

    expect(authServiceSpy.isAuth).toHaveBeenCalled();
    expect(component.isAuthenticated).toBeTrue();
    expect(component.userFullName).toBe(mockUsername);
  });

  it('should set isAuthenticated to false and userFullName when user is authenticated', async () => {
    const mockUsername = 'testuser';
    authServiceSpy.isAuth.and.returnValue(Promise.resolve(false));
    spyOn(component.storage1, 'getItem').and.returnValue(mockUsername);

    await component.ngOnInit();

    expect(authServiceSpy.isAuth).toHaveBeenCalled();
    expect(component.isAuthenticated).toBeFalse();
    expect(component.userFullName).toBe(mockUsername);
  });


});
