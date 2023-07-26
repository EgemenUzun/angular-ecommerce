import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../common/login';
import { Router } from '@angular/router';
import { of } from 'rxjs';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router:Router 
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers: [AuthService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfuly',()=>{
    component.loginFormGroup = new FormGroup({
      login: new FormGroup({
          username: new FormControl('valid_username'),
          password: new FormControl('valid_password')
      })
  });
    spyOn(router,'navigateByUrl');

    spyOn(authServiceSpy, 'loginUser').and.returnValue(of({jwt: 'valid_token', user: {username: 'valid_username'}}));
    let loginUser = new Login();
    loginUser = component.loginFormGroup.controls['login'].value;
    component.onSubmit();


    expect(component.storage.getItem('token')).toBe('valid_token');
    expect(component.storage.getItem('username')).toBe('valid_username');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/product');
    expect(component.loginFormGroup.controls['login'].value).not.toBeNull();
    expect(component.notification).toBe(false);
  });

  it('should login failed',()=>{
    component.loginFormGroup = new FormGroup({
      login: new FormGroup({
          username: new FormControl('valid_username'),
          password: new FormControl('invalid_password')
      })
  });
    spyOn(router,'navigateByUrl');

    spyOn(authServiceSpy, 'loginUser').and.returnValue(of(null));
    let loginUser = new Login();
    loginUser = component.loginFormGroup.controls['login'].value;
    component.onSubmit();


    expect(component.loginFormGroup.controls['login'].value).not.toBeNull();
    expect(component.notification).toBe(true);
  });

});
