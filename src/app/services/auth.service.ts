import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Login } from '../common/login';
import { User } from '../common/user';
import { httpRequest, isToken } from '@okta/okta-auth-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'http://localhost:8081/auth';
  userUrl ='/api/user';
  constructor(private httpClient:HttpClient) { }
  storage:Storage = localStorage;
  loginUser(body:Login):Observable<GetResponseLogin>{
    return this.httpClient.post<GetResponseLogin>(this.authUrl+'/login', body);
  }
  registerUser(body:Login):Observable<any>{
    console.log(body);
    return this.httpClient.post<any>(this.authUrl+'/register', body);
  }
  checkAuthantication():Observable<any>{
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.getToken()
   });
     return this.httpClient.get<any>(this.userUrl, { headers: reqHeader }) 
  }
  isTokenValid(): Observable<boolean> {
    var model={jwt:`${this.getToken()}`};
    return new Observable<boolean>(observer => {
     this.httpClient.post<boolean>(`${this.authUrl}/`,model).subscribe(result => {
      observer.next(result);
      observer.complete();
    },
    error => {
      observer.next(false);
      observer.complete();
    }
);
  });
  
  }
  logout(){
    this.storage.removeItem('token');
    this.storage.removeItem('username');
  }
  getToken():string{
    return (this.storage.getItem('token')!)
  }

}
interface GetResponseLogin {
  user:User,
  jwt:string;
}
