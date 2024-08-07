import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject, map } from 'rxjs';
import { ChecklistTypePreferences } from 'src/app/models/data-models/checklistTypePreferences';
import { environment } from 'src/environments/environment';

import { QuestionPreferences } from '../../models/data-models/questionPreferences';
import { SidenavService } from '../components/sidenav.service';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  baseUrl = environment.apiUrl;
  private questionPrefsSource = new Subject<{ source: string }>();
  questionPrefs$ = this.questionPrefsSource.asObservable();

  constructor(private http: HttpClient, private sidenavService: SidenavService) {
  }

  changeQuestionPreferencesSource(source: string) {
    this.questionPrefsSource.next({ source });
  }

  getQuestionPreferences(type: string) {
    return this.http.get<QuestionPreferences[]>(this.baseUrl + 'preferences/questions/getPreferencesByType/' + type);
  }

  updateQuestionPreferences(list: any) {
    return this.http.put(this.baseUrl + 'preferences/questions/updateMultiplePreferences', list);
  }

  getChecklistTypePreferences() {
    return this.http.get<ChecklistTypePreferences[]>(this.baseUrl + 'preferences/checklistTypes/getPreferences');
  }

  updateChecklistTypePreferences(list: any) {
    return this.http.put(this.baseUrl + 'preferences/checklistTypes/updateMultiplePreferences', list).pipe(
      map(response => {
        this.sidenavService.setSideNav();
        return response;
      })
    );
  }
}
