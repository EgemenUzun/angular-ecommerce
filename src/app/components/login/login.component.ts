import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Login } from 'src/app/common/login';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {filter} from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //oktaSignin: any;
  loginFormGroup!: FormGroup;
  notification=false;

  constructor(private authService:AuthService,private formBuilder: FormBuilder, private router: Router) {

   }
   storage:Storage = localStorage;
  /// Auth service
  get username() { return this.loginFormGroup.get('login.username'); }
  get password() { return this.loginFormGroup.get('login.password'); }

  // onSubmit(){
  //   let loginUser = new Login();
  //   loginUser = this.loginFormGroup.controls['login'].value;
  //   this.authService.loginUser(loginUser).subscribe(data=>{
  //     if(data!==null){
  //       this.storage.setItem('token',data.jwt);
  //       this.storage.setItem('username',data.user.username);
  //       this.router.navigateByUrl('/product')/*.then(data=> window.location.reload())*/;
  //     }
  //     else
  //       this.notification=true
  //   });
  // }


  onSubmit() {
    let loginUser = new Login();
    loginUser = this.loginFormGroup.controls['login'].value;
    this.authService.loginUser(loginUser)
      .pipe(
        filter(data => {
          this.notification = data ===null;
          return  !this.notification;
        })
      ).subscribe(data => {
        this.storage.setItem('token', data.jwt);
        this.storage.setItem('username', data.user.username);
        this.router.navigateByUrl('/product')/*.then(data=> window.location.reload())*/;
      });
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      login:this.formBuilder.group({
        username: new FormControl(''),
        password:new FormControl('')
      })
    });
  }

}
