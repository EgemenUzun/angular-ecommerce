import { TestBed } from '@angular/core/testing';

import { WebSocketService } from './web-socket.service';

fdescribe('WebSocketService', () => {
  let service: WebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [WebSocketService]});
    service = TestBed.inject(WebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a WebSocket instance', () => {
    const wsInstance = service.getSocket();

    expect(wsInstance).toBeTruthy();
    expect(wsInstance).toBeInstanceOf(WebSocket);
  });

  it('should create a WebSocket connection', () => {
    const wsSpy = spyOn(globalThis, 'WebSocket').and.callThrough();

    service = new WebSocketService();

    expect(wsSpy).toHaveBeenCalledWith('ws://localhost:3000');
  });
});
