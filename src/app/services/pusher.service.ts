declare const Pusher: any;
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel: any;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('events-channel');
  }
  
  sendMessage( message: string ) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());

    this.http.post('/message/send',message, {headers})
    .subscribe(data => {});
  }
}
