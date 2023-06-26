import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  message!:string;
  private ws: WebSocket;
  constructor() {
    this.ws = new WebSocket('ws://localhost:3000');
   }

   getSocket(): WebSocket {
    return this.ws;
  }
}
