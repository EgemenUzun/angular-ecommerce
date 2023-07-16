import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(public authService:AuthService,public router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    return new Promise(async (resolve) => {
      if((await this.authService.isAuth()).valueOf()){
        resolve(true);
      }
      else {
        this.router.navigate(['/login']);
        resolve(false);
      }
    });
  }
}
