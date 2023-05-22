import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  setAvailable(isAvailable: boolean) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.put<any>(`/me/avaliable`,isAvailable, {headers}).pipe(
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

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProfile() {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.get(`/me`, {headers}).pipe(
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

  updateProfile(userData: any) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.put<any>(`/me`,userData, {headers}).pipe(
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

  updateSettings(userData: any) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.put<any>(`/me/settings`,userData, {headers}).pipe(
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

  updateProfileExperience(userData: any) {
    const headers = new HttpHeaders().set('access_token', this.authService.getAccessToken());
    return this.http.put<any>(`/me/experiences`, userData, { headers }).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
        if (error.error) {
          errorMessage = error.error;
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        console.log(response); // log the response object
        return response;
      })
    );
  }  

  updateProfileContacts(userData: any) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.put<any>(`/me/contacts`,userData, {headers}).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
        if (error.error) {
          errorMessage = error.error;
          console.log(errorMessage);
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        console.log(response); // log the response object
        return response;
      })
    );  
  }

  updateProfileLanguages(userData: any) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.put<any>(`/me/languages`,userData, {headers}).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
        if (error.error) {
          errorMessage = error.error;
          console.log(errorMessage);
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        console.log(response); // log the response object
        return response;
      })
    );  
  }

  updateProfileLocations(userData: { typeLocations: number[]; }) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.put<any>(`/me/locations`,userData, {headers}).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
        if (error.error) {
          errorMessage = error.error;
          console.log(errorMessage);
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        console.log(response); // log the response object
        return response;
      })
    );    
  }

  updateProfileAudiences(userData: { typeAudiences: number[]; }) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.put<any>(`/me/audiences`,userData, {headers}).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
        if (error.error) {
          errorMessage = error.error;
          console.log(errorMessage);
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        console.log(response); // log the response object
        return response;
      })
    );    
  }

  updateProfilePicture(userData: { profile_picture: any; }) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.put<any>(`/me/image`,userData, {headers}).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
        if (error.error) {
          errorMessage = error.error;
          console.log(errorMessage);
        }
        return throwError(() => new Error(errorMessage));
      }
      ),
      map(response => {
        return response;
      })
    );
  }

  updatePrice(userData: any) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.post<any>(`/me/price`,userData, {headers}).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
        if (error.error) {
          console.log(error.error);
          errorMessage = error.error;
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        return response;
      })
    );
  }

  getBookings(page: number = 1, perPage = 10) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    const params = {
      page: page,
      perpage: perPage
    };
    return this.http.get(`/me/bookings`, {params,headers }).pipe(
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

  updateApproach(userData: { approach: string; }) {
    const headers = new HttpHeaders().set('access_token',  this.authService.getAccessToken());
    return this.http.post<any>(`/me/approach`,userData, {headers}).pipe(
      catchError(error => {
        let errorMessage = 'Der er opstået en fejl!';
        if (error.error) {
          console.log(error.error);
          errorMessage = error.error;
        }
        return throwError(() => new Error(errorMessage));
      }),
      map(response => {
        return response;
      })
    );
  }

  searchCompany(cvr: string) {
    const headers = new HttpHeaders().set('access_token', this.authService.getAccessToken());
    const body = {
        cvr: cvr,
    };

    return this.http.post<any>('/search/company', body, { headers }).pipe(
        catchError(error => {
            let errorMessage = 'Der er opstået en fejl!';
            if (error.error) {
                errorMessage = error.error;
                console.log(errorMessage);
            }
            return throwError(() => new Error(errorMessage));
        }),
        map(response => {
            console.log(response); // log the response object
            return response;
        })
    );  
}

}
  
  
  
  
  
  
  