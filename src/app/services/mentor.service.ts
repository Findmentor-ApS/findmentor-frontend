import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map, catchError, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private mentorList: BehaviorSubject<any> = new BehaviorSubject(null);

  setMentors(mentorList: any): void {
    this.mentorList.next(mentorList);
  }

  getMentorList(): any {
    return this.mentorList.getValue();
  }
  constructor(private http: HttpClient, private authService: AuthService) { 
  }

  searchMentors(selectedMentorType: number = 1, selectedLocationArr: number[] = [], selectedTypeForm: number[] = [], selectedLanguage: number[] = [], selectedGender: number[] = [],selectedContact: number[] = [], selectedAudience: number[] = [], page: number = 0, perPage = 10): Observable<any> {
    const params = {
      search: selectedMentorType,
      location: selectedLocationArr,
      experience: selectedTypeForm.join(','),
      language: selectedLanguage.join(','),
      gender: selectedGender.join(','),
      contact: selectedContact.join(','),
      audience: selectedAudience.join(','),
      page: page,
      perpage: perPage
    };
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.get<any>('/mentors', { params,headers }).pipe(
      map(result => ({
        result: result.result,
        totalItems: result.totalItems
      }))
    );
  }

  getMentor(userData: any) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.get(`/mentors/${userData}`, {headers}).pipe(
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

  bookMentor(userData: any) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.post<any>(`/mentors/book`,userData, {headers}).pipe(
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

  UpdateBookMentor(userData: any) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.put<any>(`/mentors/book`,userData, {headers}).pipe(
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

  bookCall(userData: any) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.post<any>(`/mentors/bookcall`,userData, {headers}).pipe(
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

  profileVisited(userData: { mentor_id: any; }) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.post<any>(`/mentors/profilevisited`,userData, {headers}).pipe(
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

  profileCalled(userData: { mentor_id: any; }) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.post<any>(`/mentors/profilecalled`,userData, {headers}).pipe(
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
