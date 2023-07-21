import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Login } from 'src/app/common/login';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['registerUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Initialize the registerFormGroup
    component.registerFormGroup = component.formBuilder.group({
      register: component.formBuilder.group({
        username: '',
        password: '',
      }),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call registerUser on onSubmit', () => {
    const testUsername = 'testUser';
    const testPassword = 'testPassword';
    const login: Login = { username: testUsername, password: testPassword };
    component.registerFormGroup.patchValue({ register: login });
    authService.registerUser.and.returnValue(of({}));
    
    component.onSubmit();

    expect(authService.registerUser).toHaveBeenCalledWith(login);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    expect(component.notification).toBeFalse();
  });

  it('should handle error on onSubmit', () => {
    const testUsername = 'testUser';
    const testPassword = 'testPassword';
    const login: Login = { username: testUsername, password: testPassword };
    component.registerFormGroup.patchValue({ register: login });
    const errorMessage = 'Error message';
    authService.registerUser.and.returnValue(throwError(errorMessage));
    
    component.onSubmit();

    expect(authService.registerUser).toHaveBeenCalledWith(login);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(component.notification).toBeTrue();
  });

  // Add more test cases to cover other scenarios and methods
});
