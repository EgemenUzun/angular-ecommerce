import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { Login } from '../common/login';
import { User } from '../common/user';

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
  isTokenValid(): Observable<boolean> {
    var subject = new Subject<boolean>();
   
      var model={jwt:`${this.getToken()}`};
      this.httpClient.post<boolean>(`${this.authUrl}/isTokenValid`,model).subscribe(result=>{
        subject.next(result);
      } );

    return subject.asObservable();
  }
   async isAuth():Promise<boolean>{
    const response = await firstValueFrom(this.isTokenValid())
    return response;
  }
  logout(){
    this.httpClient.post(`${this.authUrl}/logout/${this.storage.getItem('username')}`,null);
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
