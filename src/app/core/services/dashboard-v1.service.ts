import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpContext, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterParams } from '../types/filter-params.type';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';

const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};


@Injectable({
  providedIn: 'root',
})
export class DashboardV1Service {
  constructor(private http: HttpClient, private httpBackend: HttpBackend) {}
  createUpdateClinicTaskAssignUser = (data): Observable<any> => {
    return this.http.post('clinic/create', data, httpOptions);
  };
  getAssignedTaskUser = (data): Observable<any> => {
    return this.http.post('clinic/', data, httpOptions);
  };

  AssignTaskRequestList = (data): Observable<any> => {
    return this.http.post('study/delegation-role/assign-study-task-to-user', data, httpOptions);
  };

  AssignTaskRequestUpdate = (data): Observable<any> => {
    return this.http.post('study/delegation-role/study-task-to-user-status-update', data, httpOptions);
  };

  AssignTaskStudyList = (data: FilterParams): Observable<any> => {
    return this.http.post('study/delegation-role/study-list-filter-assign-study-task-to-user', data, httpOptions);
  };
  AssignTaskUserList = (data): Observable<any> => {
    return this.http.post('clinic/study-task-assign-user', data, httpOptions);
  };

  getStudyVisitList = (data:FilterParams): Observable<any> => {
    return this.http.post('study/study-visit-status', data, httpOptions);
  }

  getVisitList = (data): Observable<any> => {
    return this.http.post('study/study-visits-by-status', data, httpOptions);
  }
}
