import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { FilterParams } from '../types/filter-params.type';

const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};


@Injectable({
  providedIn: 'root',
})
export class ParticipantsV1Service {
  constructor(private http: HttpClient) {}
  private subDataInfo = new BehaviorSubject(null);
  public $subjectStatus: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public $subjectRemainingScreening: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  subjectDetails = this.subDataInfo.asObservable();

  getSubjectInfo = (value) => {
    this.subDataInfo.next(value);
  };

  createItem(subjectInfo): Observable<any> {
    return this.http.post('subject/create', subjectInfo, httpOptions);
  }

  getAll = (params): Observable<any> => {
    return this.http.post('subject', params, httpOptions);
  };

  getAllByStudy(params): Observable<any> {
    return this.http.post('subject/get-appointment-by-study', params, httpOptions);
  }

  deleteItem = (subjectId): Observable<any> => {
    return this.http.delete('subject/delete/' + subjectId, httpOptions);
  };

  getById = (subjectId): Observable<any> => {
    return this.http.get('subject/get-one-subject/' + subjectId, httpOptions);
  };

  updateItem = (subjectInfo): Observable<any> => {
    return this.http.put('subject/update/', subjectInfo, httpOptions);
  };

  getAllScreeningVisits(params): Observable<any> {
    return this.http.post('subject/screening', params, httpOptions);
  }

  createScreeningVisit(data): Observable<any> {
    return this.http.post('subject/screening/create', data, httpOptions);
  }

  assignStudyToSubject = (assignStudyToSubjectObject): Observable<any> => {
    return this.http.post('subject/assign-study/create', assignStudyToSubjectObject, httpOptions);
  };

  getAssignStudies = (params): Observable<any> => {
    return this.http.post('subject/assign-study', params, httpOptions);
  };

  addSubjectMedicalHistory = (historyInfo): Observable<any> => {
    return this.http.post('subject/medical-history/create', historyInfo, httpOptions);
  };

  getSubjectMedialHistory = (params): Observable<any> => {
    return this.http.post('subject/medical-history', params, httpOptions);
  };

  deleteSubjectmedicalhistory = (id): Observable<any> => {
    return this.http.delete('subject/medical-history/delete/' + id, httpOptions);
  };

  updateSubjectmedicalHistory = (data): Observable<any> => {
    return this.http.put('subject/medical-history/update', data, httpOptions);
  };

  updateScreeningVisit = (data): Observable<any> => {
    return this.http.put('subject/screening/update', data, httpOptions);
  };

  createSubjectScheduleVisit = (data): Observable<any> => {
    return this.http.post('subject/start-schedule-visit', data, httpOptions);
  };

  getSubjectScheduleVisit = (params): Observable<any> => {
    return this.http.post('subject/schedule-visit/', params, httpOptions);
  };

  filterBasedOnType(params): Observable<any> {
    return this.http.post('subject/get-study-by-filter', params, httpOptions);
  }

  getStudyByScreening = (subjectId): Observable<any> => {
    return this.http.get('subject/get-study-by-end-screening/' + subjectId, httpOptions);
  };

  getStudyByIntervalPeriod = (subjectId): Observable<any> => {
    return this.http.get('subject/get-study-by-interval-period/' + subjectId, httpOptions);
  };

  getScreeningVisitByType = (params): Observable<any> => {
    return this.http.post('subject/screening/get-added-screening', params, httpOptions);
  };

  checkInSubject(data): Observable<any> {
    return this.http.post('subject/subject-in-clinic', data, httpOptions);
  }

  checkOutSubject(data): Observable<any> {
    return this.http.put('subject/update-subject-in-clinic', data, httpOptions);
  }

  getCheckInCheckOutSubjectList(params): Observable<any> {
    return this.http.post('subject/clinic-list', params, httpOptions);
  }

  getSubjectsByStudyId = (params) => {
    return this.http.post('subject/get-subject-by-study', params, httpOptions);
  };

  uploadSubjectProcedureImage(params): Observable<any> {
    return this.http.post('subject/procedure-images/upload', params, httpOptions);
  }

  deleteSubjectProcedureImage(oid): Observable<any> {
    return this.http.delete(`subject/procedure-images/delete/${oid}`, httpOptions);
  }

  getOneSubjectVisit(oid:string):Observable<any>{
    return this.http.get('subject/get-one-subject-visit/'+oid, httpOptions);
  }

  ///Add More Functions
  subjectStatusChange(value) {
    this.$subjectStatus.next(value);
  }

  subjectRemainingScreening(value){
    this.$subjectRemainingScreening.next(value);
  }
  // getSubjectInfo = (value) => {
  //   this.subDataInfo.next(value);
  // };

  addSubject(subjectInfo): Observable<any> {
    return this.http.post('subject/create', subjectInfo, httpOptions);
  }

  getAllSubjects = (params): Observable<any> => {
    return this.http.post('subject', params, httpOptions);
  };

  getSubjectsByStudy(params: FilterParams): Observable<any> {
    return this.http.post('subject/get-appointment-by-study', params, httpOptions);
  }

  deleteSubjectById = (subjectId): Observable<any> => {
    return this.http.delete('subject/delete/' + subjectId, httpOptions);
  };

  getSubjectById = (subjectId): Observable<any> => {
    return this.http.get('subject/get-one-subject/' + subjectId, httpOptions);
  };

  updateSubject = (subjectInfo): Observable<any> => {
    return this.http.put('subject/update/', subjectInfo, httpOptions);
  };

  //old api for getting screening visits
  // getSubjectScreeningVisit(params): Observable<any> {
  //   return this.http.post('subject/screening', params, httpOptions);
  // }

  //old api for adding screening visits
  // addScreeningVisit(data): Observable<any> {
  //   return this.http.post('subject/screening/create', data, httpOptions);
  // }

  //new api for create visits based on type
  addVisitByType = (data): Observable<any> => {
    return this.http.post('subject/visit/create', data, httpOptions);
  };

  //new api for list all visits based on type
  listVisitsByType = (params): Observable<any> => {
    return this.http.post('subject/visit', params, httpOptions);
  };

  // assignStudyToSubject = (assignStudyToSubjectObject): Observable<any> => {
  //   return this.http.post('subject/assign-study/create', assignStudyToSubjectObject, httpOptions);
  // };

  // getAssignStudies = (params): Observable<any> => {
  //   return this.http.post('subject/assign-study', params, httpOptions);
  // };

  // addSubjectMedicalHistory = (historyInfo): Observable<any> => {
  //   return this.http.post('subject/medical-history/create', historyInfo, httpOptions);
  // };

  // getSubjectMedialHistory = (params): Observable<any> => {
  //   return this.http.post('subject/medical-history', params, httpOptions);
  // };

  // deleteSubjectmedicalhistory = (id): Observable<any> => {
  //   return this.http.delete('subject/medical-history/delete/' + id, httpOptions);
  // };

  // updateSubjectmedicalHistory = (data): Observable<any> => {
  //   return this.http.put('subject/medical-history/update', data, httpOptions);
  // };

  addSubjectAdverseEvent = (eventInfo): Observable<any> => {
    return this.http.post('subject/adverse-event/create', eventInfo, httpOptions);
  };

  getSubjectAdverseEvent = (params): Observable<any> => {
    return this.http.post('subject/adverse-event/list', params, httpOptions);
  };

  deleteSubjectAdverseEvent = (id): Observable<any> => {
    return this.http.delete('subject/adverse-event/delete/' + id, httpOptions);
  };

  updateSubjectAdverseEvent = (data): Observable<any> => {
    return this.http.put('subject/adverse-event/update', data, httpOptions);
  };

  // updateScreeningVisit = (data): Observable<any> => {
  //   return this.http.put('subject/screening/update', data, httpOptions);
  // };

  // createSubjectScheduleVisit = (data): Observable<any> => {
  //   return this.http.post('subject/start-schedule-visit', data, httpOptions);
  // };

  // getSubjectScheduleVisit = (params): Observable<any> => {
  //   return this.http.post('subject/schedule-visit/', params, httpOptions);
  // };

  // filterBasedOnType(params): Observable<any> {
  //   return this.http.post('subject/get-study-by-filter', params, httpOptions);
  // }

  // getStudyByScreening = (subjectId): Observable<any> => {
  //   return this.http.get('subject/get-study-by-end-screening/' + subjectId, httpOptions);
  // };

  // getStudyByIntervalPeriod = (subjectId): Observable<any> => {
  //   return this.http.get('subject/get-study-by-interval-period/' + subjectId, httpOptions);
  // };

  // getScreeningVisitByType = (params): Observable<any> => {
  //   return this.http.post('subject/screening/get-added-screening', params, httpOptions);
  // };

  // checkInSubject(data: { subject_visit_id: number }): Observable<any> {
  //   return this.http.post('subject/subject-in-clinic', data, httpOptions);
  // }

  // checkOutSubject(data: { oid: string }): Observable<any> {
  //   return this.http.put('subject/update-subject-in-clinic', data, httpOptions);
  // }

  // getCheckInCheckOutSubjectList(params): Observable<any> {
  //   return this.http.post('subject/clinic-list', params, httpOptions);
  // }

  getSubjectAllConcent(params): Observable<any> {
    return this.http.post(`subject/consent/list`, params, httpOptions);
  }

  addSubjectConsent(data): Observable<any> {
    return this.http.post('subject/consent/create', data, httpOptions);
  }

  uploadDocument(data): Observable<any> {
    return this.http.post('subject/consent/upload-document', data, httpOptions);
  }

  updateSubjectConsent(data): Observable<any> {
    return this.http.put('subject/consent/update', data, httpOptions);
  }

  uploadSubjectmedicalHistoryDocument(data): Observable<any> {
    return this.http.post('subject/medical-history/upload-document', data, httpOptions);
  }
  deleteConsentDocument(oid: string): Observable<any> {
    return this.http.get(`subject/consent/delete-upload-document/${oid}`, httpOptions);
  }

  updateSubjectStatus(data):Observable<any>{
    return this.http.post('subject/status-update', data, httpOptions);
  }

  // getOneSubjectVisit(oid:string):Observable<any>{
  //   return this.http.get('subject/get-one-subject-visit/'+oid, httpOptions);
  // }

  approveSubjectEsourceForm(data):Observable<any>{
    return this.http.post('subject/esource-form/update-approved-esource-status',data, httpOptions);
  }
}
