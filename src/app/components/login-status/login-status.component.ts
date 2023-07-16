import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = '';
  storage:Storage = sessionStorage;
  storage1:Storage = localStorage;
  constructor( private authService:AuthService,private router:Router) {}

  async ngOnInit(): Promise<void> {
    if(this.storage1.getItem("token")){
      if(await this.authService.isAuth().valueOf()){
        this.isAuthenticated = true
      }
     this.userFullName=this.storage1.getItem("username")!;
    }

  }

  

  logout() {
    // Terminates the session with and removes current tokens.
    this.authService.logout();
    this.router.navigateByUrl('/product').then(data=> window.location.reload());
  }

}