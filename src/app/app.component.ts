import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';
import { data } from 'cypress/types/jquery';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notification = false;
  isAuthenticated = false;
  storage:Storage = localStorage;

  constructor(private ws:WebSocketService,private authService:AuthService) {}
  async ngOnInit(): Promise<void> {
    this.isAuthenticated = (await this.authService.isAuth()).valueOf();

    this.ws.getSocket().addEventListener('message',(event)=>{
      if(event.data.includes('New discount arrived for '+this.storage.getItem('username'))){
        this.notification = true; 
      }
      else if(!event.data.includes('New discount arrived for '+this.storage.getItem('userEmail'))){
        this.notification = false;
      }
    });
  }
  title = 'angular-ecommerce';

  
}
