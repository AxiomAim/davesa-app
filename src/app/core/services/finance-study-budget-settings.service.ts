import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';

const { hostname } = new URL(window.location.href);
const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};


@Injectable({
  providedIn: 'root',
})
export class FinanceStudyBudgetSettingsService {
  constructor(private http: HttpClient) {}
  getStudyBudgetLaborRates(params): Observable<any> {
    return this.http.post('finance/get-labor-rates', params, httpOptions);
  }

  updateStudyBudgetLaborRates(params): Observable<any> {
    return this.http.put('finance/update-labor-rates', params, httpOptions);
  }

  getBudgetSettings(study_id: string): Observable<any> {
    return this.http.get(`finance/get-finance-budget/${study_id}`, httpOptions);
  }

  updateBudgetSettings(data): Observable<any> {
    return this.http.put(`finance/update-finance-budget`, data, httpOptions);
  }
}
