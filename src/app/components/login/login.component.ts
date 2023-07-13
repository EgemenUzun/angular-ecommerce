import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from '../../config/my-app-config';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { Login } from 'src/app/common/login';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/common/user';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;
  loginFormGroup!: FormGroup;
  notification=false;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth,private authService:AuthService,private formBuilder: FormBuilder, private router: Router) {

    /*this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      useClassicEngine: true,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });*/
   }
   storage:Storage = localStorage;
  /// Auth service
  get username() { return this.loginFormGroup.get('login.username'); }
  get password() { return this.loginFormGroup.get('login.password'); }

  onSubmit(){
    let loginUser = new Login();
    loginUser = this.loginFormGroup.controls['login'].value;
    this.authService.loginUser(loginUser).subscribe(data=>{
      if(data!=null){
        this.storage.setItem('token',data.jwt);
        this.storage.setItem('username',data.user.username);
        this.router.navigateByUrl('/product').then(data=> window.location.reload());
      }
      else
        this.notification=true
    });
  }


  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      login:this.formBuilder.group({
        username: new FormControl(''),
        password:new FormControl('')
      })
    });

    //okta service
    /*this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );*/
  }

}
