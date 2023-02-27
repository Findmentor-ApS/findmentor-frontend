import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  
  register(userType: string, userData: any) {
    
    return this.http.post<any>('/auth/register/'+userType, userData).pipe(
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

  login(userType: string, email: string) {
    const url = `${'/auth/login/'}${userType}`;
    return this.http.post(`/auth/login/${userType}`,  email ).pipe(
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

  validateLogin(userType: string, loginToken: string) {
    const url = `${'/auth/validate_login/'}${userType}/${loginToken}`;
    return this.http.get(url).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
        if (error.error) {
          errorMessage = error.error;
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        localStorage.setItem('access_token', response['access_token']);
        localStorage.setItem('type', response['type']);
        return response;
      })
    );  
  }

  validateEmail(userType: string, email_token: string) {
    const url = `${'/auth/validate_email/'}${userType}/${email_token}`;
    return this.http.get(url).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
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

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

}
