import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  ngOnInit(){
      this.authService.isValid.subscribe(data =>{
        this.isAuthenticated = data;
        this.userFullName=this.storage1.getItem("username")!;
      });
  }
  

  logout() {
    // Terminates the session with and removes current tokens.
    this.authService.logout();
    this.router.navigateByUrl('/product');
  }

}