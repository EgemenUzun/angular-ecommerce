import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/common/login';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service:AuthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers: [AuthService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfuly',()=>{
    component.username?.setValue('testName');
    component.username?.setValue('TestPassword');

    let loginUser = new Login();
    loginUser = component.loginFormGroup.controls['login'].value;
    component.onSubmit();

    
    expect(component.loginFormGroup.controls['login'].value).not.toBeNull();
    expect(component.notification).toBe(false);
  });

});
