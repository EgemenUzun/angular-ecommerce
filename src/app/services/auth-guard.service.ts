import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  storage1:Storage = localStorage;
  constructor(public authService:AuthService,public router:Router) { }
  status=false;
  canActivate(): boolean | UrlTree {
     this.authService.isTokenValid().subscribe(result=>{this.status=result;})
    return this.status  ||this.router.parseUrl('/login');
  }
}
