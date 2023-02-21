import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  
  register(userType: string, userData: any) {
    return this.http.post(`/auth/register/${userType}`, userData);
  }

  login(userType: string, userData: any) {
    return this.http.post(`/auth/login/${userType}`, userData);
  }
}
