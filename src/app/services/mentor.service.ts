import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MentorService {

  constructor(private http: HttpClient) { 
  }

  searchMentors(selectedMentorType: number, selectedLocationArr: number, selectedTypeForm: number[], selectedLanguage: number[], selectedGender: number[],selectedContact: number[], selectedTarget: number[], page: number, perPage = 10): Observable<any> {
    const params = {
      search: selectedMentorType,
      location: selectedLocationArr,
      typeForm: selectedTypeForm.join(','),
      language: selectedLanguage.join(','),
      gender: selectedGender.join(','),
      contact: selectedContact.join(','),
      target: selectedTarget.join(','),
      page: page,
      perpage: perPage
    };
    return this.http.get<any>('/mentors', { params }).pipe(
      map(result => ({
        result: result.result,
        totalItems: result.totalItems
      }))
    );
  }
}
