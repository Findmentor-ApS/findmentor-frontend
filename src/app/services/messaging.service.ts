import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Pusher from 'pusher-js/with-encryption';
import { AuthService } from './auth.service';
import { Subject, catchError, map, throwError } from 'rxjs';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  public pusher: any;
  public channel: any;
  private messageReceivedSource = new Subject<string>();
  public messageReceived$ = this.messageReceivedSource.asObservable();

  
  constructor(private http: HttpClient, private authService: AuthService, private userDataService: UserDataService) {
    this.pusher = new Pusher('dbdb62837648a19fb31a', {
      cluster: 'eu',
      forceTLS: true
    });
    // console.log('Pusher instance: ', this.pusher); // Log Pusher instance

    // this.channel = this.pusher.subscribe('chat-channel');
    // console.log('Channel: ', this.channel); // Log channel

    // this.channel.bind('new-message', (message: any) => {
    //   console.log('Received message: ', message); // Log received messages
    // });

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

    // This method is used to mark messages as seen
    markMessagesAsSeen(userData: any) {
      const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
      return this.http.post<any>(`/message/mark_messages_as_seen`, userData, {headers}).pipe(
        catchError(error => {
          let errorMessage = 'Der er opstået en fejl!';
          if (error.error) {
            errorMessage = error.error;
            console.log(errorMessage);
          }
          return throwError(() => new Error(errorMessage));
        }),
        map(response => {
          console.log(response);
          return response;
        })
      );
    }

  getMessagesForContact(id: any, usertype: any, page: number = 0) {
    // Replace with the URL of your PHP backend's get_messages endpoint
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.get<any>(`/message/get_messages_for_contact/${usertype}/${id}`, {
      params: { page: page.toString() },
      headers: headers
    }).pipe(
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


  subscribeToChatChannel(userType1: string, userId1: number, userType2: string, userId2: number) {
    const channelName = this.createChannelName(userType1, userId1, userType2, userId2);
    return this.pusher.subscribe(channelName);
  }

  private createChannelName(userType1: string, userId1: number, userType2: string, userId2: number): string {
    const participants: [string, number][] = [[userType1, userId1], [userType2, userId2]];

    participants.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        } else {
            return a[0].localeCompare(b[0]);
        }
    });

    return `chat-channel-${participants[0][0]}${participants[0][1]}-${participants[1][0]}${participants[1][1]}`;
  }

  subscribeToContactsChannelNotification(userId: string, userType: string) {
    const channelName = userType + '-' + userId +'-contacts-channel';
    const channel = this.pusher.subscribe(channelName);
    
    // bind events on the channel, example:
    channel.bind('update-contacts', (data: any) => {
      this.messageReceivedSource.next(data);
    });
  }


}
