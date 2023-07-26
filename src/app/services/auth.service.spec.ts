import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../common/user';
import { Role } from '../common/role';
import { Login } from '../common/login';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


fdescribe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let mockHttpClient: HttpClient;
 
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],
    providers: [ AuthService,],});
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    mockHttpClient = TestBed.inject(HttpClient);
  });

  it('should auth service created', () => {
    expect(service).toBeTruthy();
  });

  it('should Login User Retruned User Function',(done:DoneFn)=>{
    const roles:Role[]=[{roleId:1,authority:'User'},]
    const dummyModel ={
      user: new User('Id','test','password',roles),
      jwt:'token'
    };
    let body = new Login();
    body.username='test';
    body.password='password';
    service.loginUser(body).subscribe(data=>{
      expect(data).toBe(dummyModel);
      done();
    });
    const req = httpController.expectOne(`${service.authUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyModel);
  });

  it('should Login User Retruned Null Error Function',(done:DoneFn)=>{
    
    let body = new Login();
    body.username='test';
    body.password='password';
    service.loginUser(body).subscribe(data=>{
      expect(data).toBe(null);
      done();
    });
    const req = httpController.expectOne(`${service.authUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

  it('should Login User Retruned Null Error Handling Function',()=>{
    
    let body = new Login();
    body.username='test';
    body.password='password';
    const mockSubject = new Subject<any>();
    spyOn(mockHttpClient, 'post').and.returnValue(mockSubject);

    const observable = service.loginUser(body);

    let result: any;
    observable.subscribe((data) => {
      result = data;
    });
    mockSubject.error('Login error');

    // Expect the result to be null
    expect(result).toBeNull();

  });

  it('should Register User Returned User Function',(done:DoneFn)=>{
    const dummyModel ={
      username:'testUser',
      password:'password'
    };
    let body = new Login();
    body.username='test';
    body.password='password';
    service.registerUser(body).subscribe(data=>{
      expect(data).toBe(dummyModel);
      done();
    });
    const req = httpController.expectOne(`${service.authUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyModel);
  });

  it('should Register User Returned Null Function',(done:DoneFn)=>{
    let body = new Login();
    body.username='test';
    body.password='password';
    service.registerUser(body).subscribe(data => {
      expect(data).toBe(null);
      done();
      });
    const req = httpController.expectOne(`${service.authUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

      // Tests that the method sends a POST request to the correct URL with the correct JWT token and correctly updates the 'isValid' subject with the result of the POST request
  it('should test_valid_token', () => {
    spyOn(service.isValid,'subscribe');
    service.isTokenValid();
    service.isValid.subscribe(data=>{expect(data).toBe(true)});
    const req = httpController.expectOne(`${service.authUrl}/isTokenValid`);
    expect(req.request.method).toBe('POST');
    req.flush(true);
  });

  it('should test_invalid_token', () => {
    spyOn(service.isValid,'subscribe');
    service.isTokenValid();
    service.isValid.subscribe(data=>{expect(data).toBe(false)});
    const req = httpController.expectOne(`${service.authUrl}/isTokenValid`);
    expect(req.request.method).toBe('POST');
    req.flush(false);
  });

  it('test_valid_token', async () => {
    spyOn(service, 'isTokenValid').and.callThrough();
    spyOn(service.isValid, 'asObservable').and.callThrough();
    service.storage.setItem('token', 'valid_token');
    service.isAuth().then((response) => {
        expect(response).toBeTrue();
    });
    expect(service.isTokenValid).toHaveBeenCalled();
    expect(service.isValid.asObservable).toHaveBeenCalled();
});

it('test_invalid_token', async () => {
  spyOn(service, 'isTokenValid').and.callThrough();
  spyOn(service.isValid, 'asObservable').and.callThrough();
  service.storage.setItem('token', 'invalid_token');
  service.isAuth().then((response) => {
      expect(response).toBeFalse();
  });
  expect(service.isTokenValid).toHaveBeenCalled();
  expect(service.isValid.asObservable).toHaveBeenCalled();
});
    
  it('should call the logout API endpoint and clear the storage', () => {
    spyOn(mockHttpClient, 'post').and.returnValue(of());
    spyOn(service.storage, 'removeItem');

    service.logout();

    expect(mockHttpClient.post).toHaveBeenCalledWith(`${service.authUrl}/logout/valid_username`, (null));
    expect(service.storage.removeItem).toHaveBeenCalledTimes(2);
    expect(service.storage.removeItem).toHaveBeenCalledWith('token');
    expect(service.storage.removeItem).toHaveBeenCalledWith('username');
  });

  it('should return the stored token when getToken is called', () => {
    spyOn(service.storage, 'getItem').and.returnValue('storedToken');

    const token = service.getToken();

    expect(service.storage.getItem).toHaveBeenCalledWith('token');
    expect(token).toBe('storedToken');
  });

  it('should return the null when getToken is called', () => {
    spyOn(service.storage, 'getItem').and.returnValue('');

    const token = service.getToken();

    expect(service.storage.getItem).toHaveBeenCalledWith('token');
    expect(token).toBe('');
  });
});


