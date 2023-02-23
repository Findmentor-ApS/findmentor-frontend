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
}
