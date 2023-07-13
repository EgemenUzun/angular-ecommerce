import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/common/login';
import { User } from 'src/app/common/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService:AuthService,private formBuilder: FormBuilder,private router: Router){}
  registerFormGroup!: FormGroup;
  notification=false;
  /// Auth service
  get username() { return this.registerFormGroup.get('register.username'); }
  get password() { return this.registerFormGroup.get('register.password'); }
  onSubmit(){
    let registerUser = new Login();
    registerUser = this.registerFormGroup.controls['register'].value;
    this.authService.registerUser(registerUser).subscribe(data=>this.router.navigateByUrl('/login'),
    error => {
      this.notification=true;
    }); 
  }
  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      register:this.formBuilder.group({
        username: new FormControl(''),
        password:new FormControl('')
      })
    });
  }

}
