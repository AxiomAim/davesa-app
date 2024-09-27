import { createInjectable } from 'ngxtension/create-injectable';
import { EncryptStorage } from 'encrypt-storage';
import { HttpClient, HttpContext, HttpHandler, HttpHeaders } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GetOne } from "../interfaces/generics/getOne.interface";
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { Study } from '../interfaces/study.interface';
import { FilterParams } from '../types/filter-params.type';
import { List } from 'lodash';
import { Participant } from '../interfaces/participant.interface';
import { Observable } from 'rxjs';
import { DavesaLoadingService } from '@davesa/services/loading';
import { environment } from 'environments/environment';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});


const PARTICIPANTS = "participants";
const PARTICIPANT = "participant";
const PARTICIPANT_INFO = "participantInfo";

const httpOptions = {
    context: new HttpContext().set(DAVESA_AUTH_API, true)
  };

export const ParticipantsV2Service = createInjectable(() => {
  const _davesaLoadingService = inject(DavesaLoadingService);

  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const participants = signal<Participant[] | null>(null);
  const participant = signal<Participant | null>(null);
  const studyParticipants = signal<Participant[] | null>(null);
  const participantInfo = signal<any | null>(null);

  const loading = signal(false);
  const error = signal<string | null>(null);


  const setLoadgingBar = (show: boolean) => {
    if(show) {
      _davesaLoadingService.show()
    }

    if(!show) {
      _davesaLoadingService.hide()
    }

  }

  const loadFromStorage = () => {
    loading.set(true);
    _davesaLoadingService.show()
    error.set(null);  
    try {
      const jsonparticipants = encryptStorage.getItem(PARTICIPANTS);
      participants.set(jsonparticipants)
      const jsonParticipant = encryptStorage.getItem(PARTICIPANT);
      participant.set(jsonParticipant)

    } catch(err) {
      error.set(err)
      console.error('Error loading user from storage:', err);
    }
    loading.set(false);
    _davesaLoadingService.hide()

  }

  const setToStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      encryptStorage.setItem(PARTICIPANTS, JSON.stringify(participants()));
      encryptStorage.setItem(PARTICIPANT, JSON.stringify(participant()));
    } catch(err) {
      error.set(err)
      console.error('Error setting user to storage:', err);
    }
    loading.set(false);

  }

  const removeFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      encryptStorage.removeItem(PARTICIPANTS);
      encryptStorage.removeItem(PARTICIPANT);
    } catch(err) {
      error.set(err)
      console.error('Error removing user from storage:', err);
    }
    loading.set(false);
  }

  const setParticipant = (data) => {
    loading.set(true);
    error.set(null);  
    participant.set(data)
    loading.set(false);
  }

  const setParticipants = (data) => {
    loading.set(true);
    error.set(null);  
    participants.set(data)
    loading.set(false);
  }

  const setParticipantInfo = (data) => {
    loading.set(true);
    error.set(null);  
    participantInfo.set(data)
    loading.set(false);
  }

  const getParticipant = (data) => {
    loading.set(true);
    error.set(null);  
    loading.set(false);
    return participant()
  }

  const getParticipants = () => {
    loading.set(true);
    error.set(null);  
    loading.set(false);
    return participants()
  }

  const getAll = (params: FilterParams) => {
    _davesaLoadingService.show()
    loading.set(true);
    error.set(null);  
    return _httpClient.post<List<any>>('subject', 
        params,
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          participants.set(res.data)
          setToStorage()
          loading.set(false);
          _davesaLoadingService.hide()
          return participants()

        },
        error: (err) => {
          error.set(err);
          loading.set(false);
          _davesaLoadingService.hide()
        },
      })
    );
  }

  const getByOid = (oid: string) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.get<GetOne<Study>>('subject/get-one-subject/' + oid, httpOptions).pipe(
      tap({
        next: (res: any) => {
          participant.set(res.data)
          setToStorage()
          loading.set(false);
          return participant()
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }


  const createItem = (data) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<GetOne<any>>('subject/create', data, httpOptions).pipe(
      tap({
        next: (res: any) => {
          participant.set(res.data)
          return participant()
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const getAllByStudy = (params: FilterParams): Observable<Participant[]> => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<List<Participant[]>>('subject/get-appointment-by-study', 
      params,
      httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          studyParticipants.set(res.data)
          loading.set(false);
          return res
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const deleteItem = (id: string) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.delete<GetOne<Study>>('subject/delete/' + id, httpOptions).pipe(
      tap({
        next: (res: any) => {
          participant.set(null)
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }


  // const getById = (studyId: string) => {
  //   loading.set(true);
  //   error.set(null);  
  //   return _httpClient.get<GetOne<Study>>('subject/get-one-subject/' + studyId, httpOptions).pipe(
  //     tap({
  //       next: (res: any) => {
  //         participant.set(res.data)
  //         loading.set(false);
  //         return res
  //       },
  //       error: (err) => {
  //         error.set(err);
  //         loading.set(false);
  //       },
  //     })
  //   );
  // }



  const updateItem = (data) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.put<GetOne<any>>('subject/update/', data, httpOptions).pipe(
      tap({
        next: (res: any) => {
          participant.set(res.data)
          return participant()
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const createVisitByType = (data) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<GetOne<any>>('subject/visit/create', data, httpOptions).pipe(
      tap({
        next: (res: any) => {
          return res.data
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }





  const getVisitByStudy = (params) => {
    console.log('params', params)
    loading.set(true);
    error.set(null);  
    return _httpClient.post<any>('subject/get-all-subject-visit-by-filter', 
      params,
      httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          loading.set(false);
          return res.data
        },
        error: (err) => {
          console.log('err', err)
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const checkIn = (data: { subject_visit_id: number }) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post('subject/subject-in-clinic', data, httpOptions)
    .pipe(
      tap({
        next: (res: any) => {
          loading.set(false);
          return res
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const checkOut = (data: { oid: string }) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post('subject/update-subject-in-clinic', data, httpOptions)
    .pipe(
      tap({
        next: (res: any) => {
          loading.set(false);
          return res
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }



  // assignStudyToSubject = (assignStudyToSubjectObject): Observable<any> => {
  //   return this._httpClient.post('subject/assign-study/create', assignStudyToSubjectObject, httpOptions);
  // };

  // getAssignStudies = (params): Observable<any> => {
  //   return this._httpClient.post('subject/assign-study', params, httpOptions);
  // };

  // addSubjectMedicalHistory = (historyInfo): Observable<any> => {
  //   return this._httpClient.post('subject/medical-history/create', historyInfo, httpOptions);
  // };

  // getSubjectMedialHistory = (params): Observable<any> => {
  //   return this._httpClient.post('subject/medical-history', params, httpOptions);
  // };

  // deleteSubjectmedicalhistory = (id): Observable<any> => {
  //   return this._httpClient.delete('subject/medical-history/delete/' + id, httpOptions);
  // };

  // updateSubjectmedicalHistory = (data): Observable<any> => {
  //   return this._httpClient.put('subject/medical-history/update', data, httpOptions);
  // };

  // addSubjectAdverseEvent = (eventInfo): Observable<any> => {
  //   return this._httpClient.post('subject/adverse-event/create', eventInfo, httpOptions);
  // };

  // getSubjectAdverseEvent = (params): Observable<any> => {
  //   return this._httpClient.post('subject/adverse-event/list', params, httpOptions);
  // };

  // deleteSubjectAdverseEvent = (id): Observable<any> => {
  //   return this._httpClient.delete('subject/adverse-event/delete/' + id, httpOptions);
  // };

  // updateSubjectAdverseEvent = (data): Observable<any> => {
  //   return this._httpClient.put('subject/adverse-event/update', data, httpOptions);
  // };

  // updateScreeningVisit = (data): Observable<any> => {
  //   return this._httpClient.put('subject/screening/update', data, httpOptions);
  // };

  // createSubjectScheduleVisit = (data): Observable<any> => {
  //   return this._httpClient.post('subject/start-schedule-visit', data, httpOptions);
  // };

  // getSubjectScheduleVisit = (params): Observable<any> => {
  //   return this._httpClient.post('subject/schedule-visit/', params, httpOptions);
  // };

  // filterBasedOnType(params): Observable<any> {
  //   return this._httpClient.post('subject/get-study-by-filter', params, httpOptions);
  // }

  // getStudyByScreening = (subjectId): Observable<any> => {
  //   return this._httpClient.get('subject/get-study-by-end-screening/' + subjectId, httpOptions);
  // };

  // getStudyByIntervalPeriod = (subjectId): Observable<any> => {
  //   return this._httpClient.get('subject/get-study-by-interval-period/' + subjectId, httpOptions);
  // };

  // getScreeningVisitByType = (params): Observable<any> => {
  //   return this._httpClient.post('subject/screening/get-added-screening', params, httpOptions);
  // };



  // getCheckInCheckOutSubjectList(params): Observable<any> {
  //   return this._httpClient.post('subject/clinic-list', params, httpOptions);
  // }

  // getSubjectAllConcent(params): Observable<any> {
  //   return this._httpClient.post(`subject/consent/list`, params, httpOptions);
  // }

  // addSubjectConsent(data): Observable<any> {
  //   return this._httpClient.post('subject/consent/create', data, httpOptions);
  // }

  // uploadDocument(data): Observable<any> {
  //   return this._httpClient.post('subject/consent/upload-document', data, httpOptions);
  // }

  // updateSubjectConsent(data): Observable<any> {
  //   return this._httpClient.put('subject/consent/update', data, httpOptions);
  // }

  // uploadSubjectmedicalHistoryDocument(data): Observable<any> {
  //   return this._httpClient.post('subject/medical-history/upload-document', data, httpOptions);
  // }

  // deleteConsentDocument(oid: string): Observable<any> {
  //   return this._httpClient.get(`subject/consent/delete-upload-document/${oid}`, httpOptions);
  // }

  // updateSubjectStatus(data):Observable<any>{
  //   return this._httpClient.post('subject/status-update', data, httpOptions);
  // }


  // approveSubjectEsourceForm(data):Observable<any>{
  //   return this._httpClient.post('subject/esource-form/update-approved-esource-status',data, httpOptions);
  // }


  return {
    participants: computed(() => participants()),
    participant: computed(() => participant()),
    participantInfo: computed(() => participantInfo()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    setParticipant,
    setParticipants,
    getAll,
    createItem,
    getAllByStudy,
    deleteItem,
    getByOid,
    updateItem,
    createVisitByType,
    getParticipant,
    getParticipants,
    setLoadgingBar,
    setParticipantInfo,
    getVisitByStudy,
    checkIn,
    checkOut
  };


});