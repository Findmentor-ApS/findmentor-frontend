import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Pusher from 'pusher-js/with-encryption';
import { AuthService } from './auth.service';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private pusher: any;
  private channel: any;

  
  constructor(private http: HttpClient, private authService: AuthService) {
    this.pusher = new Pusher('dbdb62837648a19fb31a', {
      cluster: 'eu',
      forceTLS: true
    });
    console.log('Pusher instance: ', this.pusher); // Log Pusher instance

    this.channel = this.pusher.subscribe('chat-channel');
    console.log('Channel: ', this.channel); // Log channel

    this.channel.bind('new-message', (message: any) => {
      console.log('Received message: ', message); // Log received messages
    });

    // Log errors
    this.pusher.connection.bind('error', function(err: any) {
      console.error('Pusher connection error: ', err);
    });
  }

  sendMessage(userData: any) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.post<any>(`/message/send_message`,userData, {headers}).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
        if (error.error) {
          errorMessage = error.error;
          console.log(errorMessage);
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        return response;
      })
    );  
  }

// // GEt messages by id and type
//   getMessages(id: any, usertype: any) {
//     const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
//     return this.http.get<any>(`/message/get_messages/${id}/${usertype}`, {headers}).pipe(
//       catchError(error => {
//         let errorMessage = 'Der er opstået en fejl!';
//         if (error.error) {
//           errorMessage = error.error;
//           console.log(errorMessage);
//         }
//         return throwError(() => new Error(errorMessage));
//       }),
//       map(response => {
//         return response;
//       })
//     );
//   }
  
  // get_contacts
  getContacts() {

    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.get<any>(`/message/get_contacts`, {headers}).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
        if (error.error) {
          errorMessage = error.error;
          console.log(errorMessage);
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        return response;
      })
    );
  }
  
  getChannel() {
    return this.pusher.subscribe('chat-channel');
  }

  getMessagesForContact(id: any, usertype: any) {
    // Replace with the URL of your PHP backend's get_messages endpoint
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.get<any>(`/message/get_messages_for_contact/${usertype}/${id}`, {headers}).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
        if (error.error) {
          errorMessage = error.error;
          console.log(errorMessage);
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        return response;
      })
    );
  }
}
