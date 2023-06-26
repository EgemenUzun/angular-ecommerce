import { Injectable } from '@angular/core';

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
