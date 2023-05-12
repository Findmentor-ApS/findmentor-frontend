import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private authService: AuthService) { 
  }
  getMessages(targetUserType: string, targetUserId: number, page: number) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());

    return this.http.get(`/messages/${targetUserType}/${targetUserId}?page=${page}`,  {headers}).pipe(
      catchError(error => {
        let errorMessage = 'Error loading messages!';
        if (error.error) {
          errorMessage = error.error;
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        return response;
      })
    );
  }

  sendMessage(targetUserType: string, targetUserId: number, message: string) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    const userData = {
      message: message,
    }
    return this.http.post(`/messages/${targetUserType}/${targetUserId}`,userData, {headers}).pipe(
      catchError(error => {
        let errorMessage = 'Error sending message!';
        if (error.error) {
          errorMessage = error.error;
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        return response;
      })
    );
  }

}
