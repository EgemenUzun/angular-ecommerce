import { TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

fdescribe('AuthGuardService', () => {
  let authService: AuthService;
  let router: Router;
  let authGuardService: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule], // Required for testing Router
      providers: [AuthGuardService, AuthService],
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    authGuardService = TestBed.inject(AuthGuardService);
  });

  it('should allow navigation if user is authenticated', async () => {
    // Create a spy for the 'isAuth' method of the authService
    spyOn(authService, 'isAuth').and.returnValue(Promise.resolve(true));

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result = await authGuardService.canActivate(route, state);

    expect(result).toBe(true);
    expect(authService.isAuth).toHaveBeenCalled();
  });

  it('should redirect to login page and deny navigation if user is not authenticated', async () => {
    // Create a spy for the 'isAuth' method of the authService
    spyOn(authService, 'isAuth').and.returnValue(Promise.resolve(false));

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    // Create a spy for the 'navigate' method of the router
    spyOn(router, 'navigate');

    const result = await authGuardService.canActivate(route, state);

    expect(result).toBe(false);
    expect(authService.isAuth).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
