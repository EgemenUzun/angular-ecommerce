import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { Login } from '../common/login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'http://localhost:8081/auth';
  userUrl ='/api/user';
  constructor(private httpClient:HttpClient) { }
  storage:Storage = localStorage;
  isValid = new Subject<boolean>();
  loginUser(body:Login):Observable<any>{
    const subject = new Subject<any>();
    this.httpClient.post<any>(this.authUrl+'/login', body).subscribe(data=>{
      subject.next(data);
      this.isValid.next(data!==null);
    },(error)=>{
      subject.next(null);
    }
    );
    return subject.asObservable();
  }
  registerUser(body:Login):Observable<any>{
    return this.httpClient.post<any>(this.authUrl+'/register', body);
  }
   isTokenValid(): void {

      this.httpClient.post<boolean>(`${this.authUrl}/isTokenValid`,{jwt:`${this.getToken()}`}).subscribe(result=>{
        this.isValid.next(result);
      } );

  }
   async isAuth():Promise<boolean>{
    this.isTokenValid();
    return await firstValueFrom(this.isValid.asObservable());
  }
  logout(){
    this.httpClient.post(`${this.authUrl}/logout/${this.storage.getItem('username')}`,null);
    this.storage.removeItem('token');
    this.storage.removeItem('username');
    this.isValid.next(false);
  }
  getToken():string{
    return (this.storage.getItem('token')!)
  }

}

