import { createInjectable } from 'ngxtension/create-injectable';
import { EncryptStorage } from 'encrypt-storage';
import { HttpClient, HttpContext, HttpHandler, HttpHeaders } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { FilterParams } from '../types/filter-params.type';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { environment } from 'environments/environment';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});


const ALL_STUDY_VISITS = "allStudyVisits";
const ALL_STUDY_VISITS_BY_STATUS = "allVisitsByStatus";
const ASSIGNED_TASK_USER = "assignedfTaskUser";
const TASK_DATA_SOURCE = "taskDataSource";
const ESOURCE_DATA_SOURCE = "esourceDataSource";

const httpOptions = {
    context: new HttpContext().set(DAVESA_AUTH_API, true)
  };

export const DashboardV2Service = createInjectable(() => {
  const _httpClient = inject(HttpClient);
  const loading = signal(false);
  const error = signal<string | null>(null)

  const allStudyVisits = signal<any | null>(null)
  const allVisitsByStatus = signal<any | null>(null)
  const assignedfTaskUser = signal<any | null>(null)
  const taskDataSource = signal<any | null>(null)
  const esourceDataSource = signal<any | null>(null)

  const createUpdateClinicTaskAssignUser = (data) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post('clinic/create', data, httpOptions).pipe(
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

  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonpallStduyVisitss = encryptStorage.getItem(ALL_STUDY_VISITS);
      allStudyVisits.set(jsonpallStduyVisitss)
      const jsonAllVisitsByStatus = encryptStorage.getItem(ALL_STUDY_VISITS_BY_STATUS);
      allVisitsByStatus.set(jsonAllVisitsByStatus)
      const jsonassignedfTaskUser = encryptStorage.getItem(ASSIGNED_TASK_USER);
      assignedfTaskUser.set(jsonassignedfTaskUser)
      const jsontaskDataSource = encryptStorage.getItem(TASK_DATA_SOURCE);
      taskDataSource.set(jsontaskDataSource)
      const jsonesourceDataSource = encryptStorage.getItem(ESOURCE_DATA_SOURCE);
      esourceDataSource.set(jsonesourceDataSource)

    } catch(err) {
      error.set(err)
      console.error('Error loading user from storage:', err);
    }
    loading.set(false);

  }

  const setToStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      encryptStorage.setItem(ALL_STUDY_VISITS, JSON.stringify(allStudyVisits()));
      encryptStorage.setItem(ALL_STUDY_VISITS_BY_STATUS, JSON.stringify(allVisitsByStatus()));
      encryptStorage.setItem(ASSIGNED_TASK_USER, JSON.stringify(assignedfTaskUser()));
      encryptStorage.setItem(TASK_DATA_SOURCE, JSON.stringify(taskDataSource()));
      encryptStorage.setItem(ESOURCE_DATA_SOURCE, JSON.stringify(esourceDataSource()));

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
      encryptStorage.removeItem(ALL_STUDY_VISITS);
      encryptStorage.removeItem(ALL_STUDY_VISITS_BY_STATUS);
      encryptStorage.removeItem(ASSIGNED_TASK_USER);
      encryptStorage.removeItem(TASK_DATA_SOURCE);
      encryptStorage.removeItem(ESOURCE_DATA_SOURCE);
    } catch(err) {
      error.set(err)
      console.error('Error removing user from storage:', err);
    }
    loading.set(false);
  }


  const getAssignedTaskUser = (data) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post<any>('clinic/', data, httpOptions).pipe(
      tap({
        next: (res: any) => {
          assignedfTaskUser.set(res.data)
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

  const AssignTaskRequestList = (data) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post('study/delegation-role/assign-study-task-to-user', data, httpOptions).pipe(
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


  const AssignTaskRequestUpdate = (data) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post('study/delegation-role/study-task-to-user-status-update', data, httpOptions).pipe(
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

  const AssignTaskStudyList = (data: FilterParams) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post<any>('study/delegation-role/study-list-filter-assign-study-task-to-user', data, httpOptions).pipe(
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

  const AssignTaskUserList = (data) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post('clinic/study-task-assign-user', data, httpOptions).pipe(
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

  const setAllStudyVisits = (data) => {
    loading.set(true);
    error.set(null);  
    allStudyVisits.set(data)
    setToStorage()
    loading.set(false);
  }

  const setAallVisitsByStatus = (data) => {
    loading.set(true);
    error.set(null);  
    allVisitsByStatus.set(data)
    setToStorage()
    loading.set(false);
  }

  const setAssignedTaskUser = (data) => {
    loading.set(true);
    error.set(null);  
    assignedfTaskUser.set(data)
    setToStorage()
    loading.set(false);
  }

  const setTaskDataSource = (data) => {
    loading.set(true);
    error.set(null);  
    taskDataSource.set(data)
    setToStorage()
    loading.set(false);
  }

  const setEsourceDataSource = (data) => {
    loading.set(true);
    error.set(null);  
    esourceDataSource.set(data)
    setToStorage()
    loading.set(false);
  }


  const getAllStudyVisits = (data: FilterParams) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post<any>('study/study-visit-status', data, httpOptions).pipe(
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

  const getllVisitsByStatus = (data: FilterParams) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post<any>('study/study-visits-by-status', data, httpOptions).pipe(
      tap({
        next: (res: any) => {
          loading.set(false);
          allVisitsByStatus.set(res.data)
          setToStorage()
          return res
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }


  return {
    allStudyVisits: computed(() => allStudyVisits()),
    allVisitsByStatus: computed(() => allVisitsByStatus()),
    taskDataSource: computed(() => taskDataSource()),
    esourceDataSource: computed(() => esourceDataSource()),
    createUpdateClinicTaskAssignUser,
    getAssignedTaskUser,
    AssignTaskRequestList,
    AssignTaskRequestUpdate,
    AssignTaskStudyList,
    AssignTaskUserList,
    getAllStudyVisits,
    getllVisitsByStatus,
    setToStorage,
    loadFromStorage,
    removeFromStorage,
    setAllStudyVisits,
    setAallVisitsByStatus,
    setAssignedTaskUser,
    setTaskDataSource,
    setEsourceDataSource
  

  };


});