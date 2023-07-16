import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';
import { OktaAuthStateService } from '@okta/okta-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notification = false;
  isAuthenticated = false;
  storage:Storage = sessionStorage;

  constructor(private ws:WebSocketService,private oktaAuthService: OktaAuthStateService) {}
  ngOnInit(): void {
    this.ws.getSocket().addEventListener('message',(event)=>{
      if(event.data.includes('New discount arrived for '+this.storage.getItem('userEmail'))){
        this.notification = true; 
      }
      else if(!event.data.includes('New discount arrived for '+this.storage.getItem('userEmail'))){
        this.notification = false;
      }
    });
  }
  title = 'angular-ecommerce';

  
}
