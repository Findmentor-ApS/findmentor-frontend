import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  constructor(private http: HttpClient) { }

  searchMentors(selectedSearch: number, selectedLocationArr: number[], selectedTypeForm: number[], selectedLanguage: number[], selectedGender: number[]): Observable<any> {
    const query = `?search=selectedSearch&location=${selectedLocationArr.join(',')}&typeForm=${selectedTypeForm.join(',')}&language=${selectedLanguage.join(',')}&gender=${selectedGender.join(',')}`;
    return this.http.get<any>(`/mentors${query}`);
  }
}
