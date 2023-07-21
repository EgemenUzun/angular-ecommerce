import { TestBed } from '@angular/core/testing';

import { RouteService } from './route.service';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('RouteService', () => {
  let service: RouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [RouterTestingModule], // We need to import RouterTestingModule to test routes
    providers: [RouteService]});
    service = TestBed.inject(RouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the expected routes', () => {
    const routes = service.getRoutes();

    expect(routes).toBeTruthy(); 
    expect(routes.length).toBe(13); 

    // Check a few specific routes
    expect(routes[0].path).toBe('order-hostory');
    expect(routes[0].component).toBeDefined();
    expect(routes[0].canActivate).toContain(jasmine.any(Function));

    expect(routes[2].path).toBe('login');
    expect(routes[2].component).toBeDefined();
    expect(routes[2].canActivate).toBeUndefined(); 

  });
});
