import { HttpBackend, HttpClient, HttpContext, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { EncryptStorage } from 'encrypt-storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { Update } from '../interfaces/generics/update.interface';
import { Visit } from '../interfaces/visit.interface';
import { FilterParams } from '../types/filter-params.type';
import { environment } from 'environments/environment';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});

const { hostname } = new URL(window.location.href);
const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};

@Injectable({
  providedIn: 'root',
})
export class SubjectManagerV2Service {
  constructor(private http: HttpClient, private httpBackend: HttpBackend) {}

  private _visitSub = new BehaviorSubject(null);
  private visitSub$ = this._visitSub.asObservable();

  getUpdatedVisit(value) {
    return this._visitSub.next(value);
  }

  getAssignStudies = (params): Observable<any> => {
    return this.http.post('subject/assign-study', params, httpOptions);
  };

  getVisitBasedOnStudy = (data): Observable<any> => {
    return this.http.post('subject/get-all-subject-visit-by-filter', data, httpOptions);
  };

  makeScheduleVisitAppointment = (appointmentInfo) => {
    return this.http.put('subject/schedule-visit/update', appointmentInfo, httpOptions);
  };

  makeAppointment = (appointmentInfo): Observable<Update<Visit>> => {
    return this.http.put<Update<Visit>>('subject/visit/update', appointmentInfo, httpOptions);
  };

  makeScreeningVisitAppointment = (appointmentInfo) => {
    return this.http.put('subject/screening/update', appointmentInfo, httpOptions);
  };

  getAllAppointments = (params) => {
    return this.http.get('appointment', {
      ...httpOptions,
      params
    });
  };

  getSubjectsByStudy = (params) => {
    return this.http.post('subject/get-subject-by-study', params, httpOptions);
  };

  getSubjectAllMedication = (params) => {
    return this.http.post('subject/medication-log', params, httpOptions);
  };

  addSubjectMedication = (data) => {
    return this.http.post('subject/medication-log/create', data, httpOptions);
  };

  getSubjectsAndVisitByStudy = (params) => {
    return this.http.post('subject/get-visit-by-list-of-subject', params, httpOptions);
  };

  updateSubjectMedication = (data) => {
    return this.http.put('subject/medication-log/update', data, httpOptions);
  };

  getDrug = (searchKeyword) => {
    return this.httpBackend.handle(
      new HttpRequest(
        'GET',
        'https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=' + searchKeyword + '&ef=STRENGTHS_AND_FORMS'
      )
    );
  };

  createSubjectEsourceForm = (data) => {
    return this.http.post('subject/esource-form/create', data, httpOptions);
  };

  updateSubjectEsourceForm = (data) => {
    return this.http.put(`subject/esource-form/update`, data, httpOptions);
  };

  getEsourceFormsBasedOnProcedure = (visitId, procedureOid, subjectOid) => {
    return this.http.get(`subject/get-esource-by-procedure/${visitId}/${procedureOid}/${subjectOid}`, httpOptions);
  };

  getProcedureByVisitId = (data) => {
    return this.http.post(`subject/get-procedure-by-visit-id`, data, httpOptions);
  };

  getAllSujbectsAppointments = (params: FilterParams) => {
    return this.http.post(`subject/get-calender-appointment`, params, httpOptions);
  };

  uploadEsourceDocument = (data) => {
    return this.http.post(`subject/esource-form/upload-document`, data, httpOptions);
  };

  deleteEsourceDocument = (data) => {
    return this.http.post(`subject/esource-form/delete-document`, data, httpOptions);
  };

  toggleFileUploadStatus = (data) => {
    return this.http.post(`subject/esource-form-file-upload/toggle-file-upload-status`, data, httpOptions);
  };

  printEsourceForm(data): Observable<any> {
    return this.http.post(`subject/download-esource-form-filter-by-subject-visit/`, data, httpOptions);
  }

  getOneSubjectEsourceForm(oid): Observable<any> {
    return this.http.get('subject/esource-form/get-one-esource-form/' + oid, httpOptions);
  }

  updateSubjectProcedureOrder(data): Observable<any> {
    return this.http.put('subject/procedure-order/update', data, httpOptions);
  }

  getOneEtextForm(data): Observable<any> {
    return this.http.post(`eText/get-one-eText-eForm/`, data, httpOptions);
  }
  saveSubjectEtextForm(data): Observable<any> {
    return this.http.post(`eText/save-eText-eForm/`, data, httpOptions);
  }
}
