import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from './services/web-socket.service';
import { OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private oktaAuthService: OktaAuthStateService ,private ws:WebSocketService) {}
  ngOnInit(): void {
  }
  title = 'angular-ecommerce';

  
}
