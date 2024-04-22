import {Inject, Injectable, Self} from '@angular/core';
import { Observable } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})

export class WebSocketKlinesService<T> {
  private socket$: WebSocketSubject<T> | null = null;

  constructor(@Inject('WS_URL') private baseUrl: string) {
  }

  setNewUrl(url: string) {
    this.socket$ = webSocket<T>(this.baseUrl + url);
  }

  receiveMessage(): Observable<T> {
    if (this.socket$) {
      return this.socket$.asObservable();
    } else {
      throw new Error("socket is null!")
    }
  }

  close() {
    if (this.socket$) {
      this.socket$.unsubscribe();
    } else {
      console.log("socket is null!")
    }
  }
}
