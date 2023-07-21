import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../common/user';
import { Role } from '../common/role';
import { Login } from '../common/login';
import { of } from 'rxjs';
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

  it('should Login User Retruned Null Function',(done:DoneFn)=>{
    
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
    service.registerUser(body).subscribe(data=>{
      expect(data).toBe(null);
      done();
      });
    const req = httpController.expectOne(`${service.authUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

  it('should Token Validation is true Function',(done:DoneFn)=>{
    service.isTokenValid().subscribe(data=>{
      expect(data).toBe(true)
      done();
    });
    const req = httpController.expectOne(`${service.authUrl}/isTokenValid`);
    expect(req.request.method).toBe('POST');
    req.flush(true);
  });

  it('should Token Validation is false Function',(done:DoneFn)=>{
    service.isTokenValid().subscribe(data=>{
      expect(data).toBe(false);
      done();
    });
    const req = httpController.expectOne(`${service.authUrl}/isTokenValid`);
    expect(req.request.method).toBe('POST');
    req.flush(false);
  });

  it('should Is Authenticated Retruns True',async () => {
    spyOn(service, 'isTokenValid').and.returnValue(of(true));
    spyOn(service, 'getToken').and.returnValue('validToken');

    const result = await service.isAuth();

    expect(service.isTokenValid).toHaveBeenCalled();
    expect(result).toBe(true);
  })

  it('should Is Authenticated Retruns false',async () => {
    spyOn(service, 'isTokenValid').and.returnValue(of(false));
    spyOn(service, 'getToken').and.returnValue('');

    const result = await service.isAuth();

    expect(service.isTokenValid).toHaveBeenCalled();
    expect(result).toBe(false);
  })

  it('should call the logout API endpoint and clear the storage', () => {
    spyOn(mockHttpClient, 'post').and.returnValue(of());
    spyOn(service.storage, 'removeItem');

    service.logout();

    expect(mockHttpClient.post).toHaveBeenCalledWith(`${service.authUrl}/logout/null`, (null));
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


