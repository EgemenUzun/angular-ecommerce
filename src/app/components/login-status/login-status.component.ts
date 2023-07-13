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
  @Input() data!:Observable<boolean> ;
  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth, 
    private authService:AuthService,
    private router:Router) {}

  ngOnInit(): void {
    if(this.storage1.getItem("token")){
     this.authService.isTokenValid().subscribe(result=>{this.isAuthenticated=result;})
     this.userFullName=this.storage1.getItem("username")!;
    }
    // Subscribe to authentication state changes
    /*this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    );*/
  }
  changeStatus(){
     
    /*if(this.authService.isUserLoggedIn()){
      this.isAuthenticated=true;
        this.userFullName = this.storage1.getItem('username')!
    }
    else
      this.isAuthenticated=false;*/
    /*this.authService.checkAuthantication().subscribe((response)=>{
    },
    (err:HttpErrorResponse)=>{
      if(err.status==200){
        this.isAuthenticated=true;
        this.userFullName = this.storage1.getItem('username')!
      }
      else
        this.isAuthenticated=false;
    }
    );*/
  }
  
  getUserDetails() {
    if (this.isAuthenticated) {
      // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      /*this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;

          // retrieve the user's email from authentication response
          const email = res.email;
          // now store the email in browser storage
          this.storage.setItem('userEmail',JSON.stringify(email));
        }
      );*/
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.authService.logout();
    this.router.navigateByUrl('/product').then(data=> window.location.reload());
    //this.oktaAuth.signOut();
  }

}