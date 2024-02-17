import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, min, of } from 'rxjs';
import { PaginatedResult } from '../models/data-models/pagination';
import { getDateOnly } from '../helpers/functions/getDateOnlyFn';
import { CompletedChecklists } from '../models/data-models/completedChecklists';
import { QuestionSet } from '../models/form-models/questionSet';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  baseUrl = environment.apiUrl;
  table: any[] = [];
  type: string = '';
  paginatedResult: PaginatedResult<any[]> = new PaginatedResult<any[]>;

  constructor(private http: HttpClient) { }

  addOrUpdateEntry(type: string, model: any, id: number) {
    if (id) return this.http.put(this.baseUrl + type + '/updateById/' + id.toString(), model);
    else return this.http.post(this.baseUrl + type + '/add', model);
  }

  getEntryById(type: string, id: string) {
    return this.http.get<any>(this.baseUrl + type + '/getMyChecklistById/' + id);
  }

  getMinDateEntry(type: string) {
    return this.http.get<any>(this.baseUrl + type + '/getMinDateEntry');
  }

  getMaxDateEntry(type: string) {
    return this.http.get<any>(this.baseUrl + type + '/getMaxDateEntry');
  }

  deleteEntry(type: string, id: string) {
    return this.http.delete(this.baseUrl + type + '/delete/' + id.toString());
  }

  getColumns(type: string) {
    return this.http.get<QuestionSet[]>(this.baseUrl + type + '/getQuestionSet');
  }

  getChecklistById(type: string, id: string) {
    return this.http.get<any>(this.baseUrl + type + '/getMyChecklistById/' + id);
  }

  getData(type: string, page?: number, itemsPerPage?: number, minDate?: string, maxDate?: string) {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (minDate && maxDate) {
      params = params.append('minDate', getDateOnly(minDate)!);
      params = params.append('maxDate', getDateOnly(maxDate)!);
    }

    return this.http.get<any[]>(this.baseUrl + type + '/getMyChecklists',
      {observe: 'response', params}).pipe(map(
        response => {
          if (response.body) this.paginatedResult.result = response.body;
          const pagination = response.headers.get('Pagination');
          if (pagination) this.paginatedResult.pagination = JSON.parse(pagination);
          return this.paginatedResult;
        }
    ))
  }

  getQuestions(type: string, initialChecklist?: any) {
    return this.http.get<QuestionSet[]>(this.baseUrl + type + '/getQuestionSet');
  }

  getCompletedToday() {
    return this.http.get<CompletedChecklists[]>(this.baseUrl + 'user/getCompletedToday');
  }
}