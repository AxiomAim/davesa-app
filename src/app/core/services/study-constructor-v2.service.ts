import { createInjectable } from 'ngxtension/create-injectable';
import { HttpClient, HttpContext, HttpHandler, HttpHeaders } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GetOne } from "../interfaces/generics/getOne.interface";
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { Study, StudyVersion } from '../interfaces/study.interface';
import { FilterParams } from '../types/filter-params.type';
import { List } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'environments/environment';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});

const STUDIES = "studies";
const STUDY = "study";
const DATA_SUB = "dataSub";
const CURRENT_STUDY = "currentStudy";

const httpOptions = {
    context: new HttpContext().set(DAVESA_AUTH_API, true)
  };

export const StudyConstructorV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const studies = signal<any | null>(null);
  const newStudy = signal<Study | null>(null);
  const study = signal<any | null>(null);
  const dataSub = signal<any | null>(null);
  const currentStudy = signal<any | null>(null);

  const loading = signal(false);
  const error = signal<string | null>(null);


  const changeDefaultStudy = (study: Study) => {
    loading.set(true);
    error.set(null);  
    dataSub.set(study)
    loading.set(false);
  }

  const setStudyCurrent = (study: Study) => {
    loading.set(true);
    error.set(null);  
    currentStudy.set(study)
    loading.set(false);
  }

  const getEmptyStudy = () => {
    loading.set(true);
    error.set(null);  
    const emptyStudy: Study = {
      id: null,
      oid: '00000000-0000-0000-0000-000000000000',
      study_id: null,
      site_account_id: null,
      name: null,
      nick_name: null,
      number: 'NEW-STUDY',
      due_date: null,
      schedule_type: null,
      sponsor: null,
      interval: null,
      sponsor_id: null,
      cro_id: null,
      irb_id: null,
      indication: null,
      site_number: null,
      supervisor_id: null,
      study_phase: null,
      study_type: null,
      study_timeline: null,
      created_by: null,
      updated_by: null,
      created_at: null,
      updated_at: null,
      user: null,
      protocol: null,
      site_account: null,
      study_schedule_visits: null,
      sponsor_contact_info: null,
      irb_contact_info: null,
      cro_contact_info: null,
      site_account_bank_detail: null,
      protocol_name: null,
      recruitment_status: null,
      checked: null,
      status: null,
      is_finance: null,
      site_initial_visit_date: null,
      isf_repository: null,
      isf_type: null,
      study_email_id: null,
      is_group_create: null,
      task_clone: null,
      study_version_id: null,
      logo: 'images/avatars/study-avatar.jpg',
      target_enrollment: null,
      deleted: null,
      deleted_by: null,
      subject_enrolled_count: null,
      subject_screening_count: null,
      study_protocols: null,
      is_lock: null,
      is_global: null
    }
    study.set(emptyStudy)
    loading.set(false);
    return emptyStudy;
  }

  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonorgStudies = JSON.parse(window.sessionStorage.getItem(STUDIES) || null);
      studies.set(jsonorgStudies)
      const jsonStudy = JSON.parse(window.sessionStorage.getItem(STUDY) || null);
      study.set(jsonStudy)
      const jsondataSub = JSON.parse(window.sessionStorage.getItem(DATA_SUB) || null);
      dataSub.set(jsondataSub)
      const jsonscurrentStudy = JSON.parse(window.sessionStorage.getItem(CURRENT_STUDY) || null);
      currentStudy.set(jsonscurrentStudy)

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
      window.sessionStorage[STUDIES] =JSON.stringify(studies());
      window.sessionStorage[STUDY] =JSON.stringify(study());
      window.sessionStorage[DATA_SUB] =JSON.stringify(dataSub());
      window.sessionStorage[CURRENT_STUDY] =JSON.stringify(currentStudy());
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
      window.sessionStorage[STUDIES].removeItem(STUDIES);
      window.sessionStorage[STUDY].removeItem(STUDY);
      window.sessionStorage[DATA_SUB].removeItem(DATA_SUB);
      window.sessionStorage[CURRENT_STUDY].removeItem(CURRENT_STUDY);
    } catch(err) {
      error.set(err)
      console.error('Error removing user from storage:', err);
    }
    loading.set(false);
  }

  const setCurrentStudy = (value: any) => {
    loading.set(true);
    error.set(null);  
    currentStudy.set(value);
    loading.set(false);
    return currentStudy()
  }

  const getStudyList = (params: FilterParams) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<List<Study>>('global/study', 
        params,
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          studies.set(res.data)
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const getStudyById = (id: string) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.get<GetOne<Study>>('global/study/get-one-study/' + id, httpOptions).pipe(
      tap({
        next: (res: any) => {
          study.set(res.data)
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const getStudyVersionById = (id: string) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.get<GetOne<Study>>('study/version/get-one-version/' + id, httpOptions).pipe(
      tap({
        next: (res: any) => {
          study.set(res.data)
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }


  const createStudy = (data) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<GetOne<Study>>('global/study/create', data, httpOptions).pipe(
      tap({
        next: (res: any) => {
          study.set(res.data)
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const updateStudy = (study: any) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.put<any>('global/study/update/' + study.oid, study, httpOptions).pipe(
      tap({
        next: (res: any) => {
          study.set(res.data)
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  // getStudyVersionList(
  //   filterParams: FilterParams
  // ): Observable<List<StudyVersion>> {
  //   return this.http.post<List<StudyVersion>>("study/version", filterParams);
  // }


  const getStudyVersionList = (params: FilterParams) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<List<StudyVersion>>('study/version', 
        params,
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          studies.set(res.data)
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const getProtocolList = (params: FilterParams) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post('study/study-protocol', 
        params,
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          loading.set(false);
          return res.data
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const archiveActionArray = (isAdmin, rows) => {
    const actionArray = [];
    // Indexes where archive or unarchive should display based on studyStatus
    const toggleIconsIndexes = rows.reduce(
      (acc, curr, idx) =>
        curr.studyStatus === "Archive" ? [...acc, idx] : acc,
      []
    );

    if (isAdmin) {
      actionArray.push({
        icon: "archive",
        function: "archiveEntity",
        color: "warn",
        tooltip: "Archive Study",
        toggleIcons: {
          icon: "unarchive",
          index: toggleIconsIndexes,
          tooltip: "Re-Enable Study",
        },
      });
    }

    return actionArray;
  }

  const archiveStudy = (data) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post('study/archive-study', 
        data,
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          loading.set(false);
          return res.data
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

const deleteStudyDelegationRole = (oid) => {
  loading.set(true);
  error.set(null);  
  return _httpClient.delete('study/study-delegation-role/delete/' + oid, 
      httpOptions
  ).pipe(
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

const deleteStudy = (id, type) => {
  loading.set(true);
  error.set(null);  
  return _httpClient.delete(`study/delete/${id}/${type}`, 
      httpOptions
  ).pipe(
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

const generateBillableItem = (data) => {
  loading.set(true);
  error.set(null);  
  return _httpClient.post("finance/generate-billable-item", data, httpOptions       
  ).pipe(
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

const updateStudyLockStatus = (data) => {
  loading.set(true);
  error.set(null);  
  return _httpClient.post("global/study/toggle-lock", data, httpOptions       
  ).pipe(
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


  return {
    studies: computed(() => studies()),
    study: computed(() => study()),
    dataSub: computed(() => dataSub()),
    currentStudy: computed(() => currentStudy()),
    newStudy: computed(() => newStudy()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    changeDefaultStudy,
    setStudyCurrent,
    getStudyList,
    getStudyById,
    getStudyVersionById,
    getStudyVersionList,
    getProtocolList,
    createStudy,
    updateStudy,
    getEmptyStudy,
    setCurrentStudy,
    archiveActionArray,
    archiveStudy,
    deleteStudyDelegationRole,
    deleteStudy,
    generateBillableItem,
    updateStudyLockStatus

  };


});



  // getStudyDelegationRole(filterParams): Observable<any> {
  //   return this.http.post("study/study-delegation-role", filterParams);
  // }

  // saveDelegationLog(studyDelegationLog): Observable<any> {
  //   return this.http.put("study/delegation-log/update", studyDelegationLog);
  // }

  // createUpdateStudyDelegationRole(
  //   studyDelegationRole: StudyDelegationRole
  // ): Observable<any> {
  //   return this.http.put(
  //     "study/study-delegation-role/update/" + studyDelegationRole.oid,
  //     studyDelegationRole
  //   );
  // }

  // deleteStudyDelegationRole(oid): Observable<any> {
  //   return this.http.delete("study/study-delegation-role/delete/" + oid);
  // }

  // createUpdateProtocol(studyProtocol): Observable<any> {
  //   return this.http.put("study/study-protocol/update/", studyProtocol);
  // }

  // uploadProtocolDocument(protocolDocument): Observable<any> {
  //   return this.http.post("study/upload-protocol", protocolDocument);
  // }

  // getProtocolList(params): Observable<any> {
  //   return this.http.post("study/study-protocol", params);
  // }

  // deleteProtocol(oid, auditTrail: any,id:any): Observable<any> {
  //   const bodyOption = { body: auditTrail };
  //   return this.http.delete("study/study-protocol/delete/" + oid + "/global" + `study_version_id=${id}`, bodyOption);
  // }

  // getDelegationLogWithUser(studyId): Observable<any> {
  //   return this.http.get(
  //     "study/delegation-log/get-delegation-role-association-user/" + studyId
  //   );
  // }

  // getUserStudyList(params): Observable<any> {
  //   return this.http.post("study/list-study-by-user", params);
  // }

  // updateDefaultStudyByUser(studyId): Observable<any> {
  //   return this.http.put("study/update-study-by-user", studyId);
  // }

  // getUserDefaultStudy(): Observable<any> {
  //   return this.http.get("study/get-default-study");
  // }

  // getStudyOnsiteUser(data): Observable<any> {
  //   return this.http.post("study/site-account-by-onsite-user-list", data);
  // }

  // cloneStudy(data): Observable<any> {
  //   return this.http.post("global/study/clone-study-global", data);
  // }

  // exportStudyInformation(studyOid): Observable<any> {
  //   return this.http.get("study/export/" + studyOid);
  // }

  // getStudyContacts(params: FilterParams): Observable<List<StudyContacts>> {
  //   return this.http.post<List<StudyContacts>>("study/study-contact", params);
  // }

  // saveStudyContact(params): Observable<any> {
  //   return this.http.post("study/study-contact/create", params);
  // }

  // updateStudyContact(data): Observable<any> {
  //   return this.http.put("study/study-contact/update", data);
  // }

  // deleteStudyContact(oid): Observable<any> {
  //   return this.http.delete("study/study-contact/delete/" + oid);
  // }

  // getBankAccountDetailBySiteAccount(id): Observable<any> {
  //   return this.http.get("study/bank-details/" + id);
  // }

  // getChatStatusLogs(
  //   id: string,
  //   data: FilterParams
  // ): Observable<List<ChatStatusLog>> {
  //   return this.http.post<List<ChatStatusLog>>(
  //     `chat/get-status-chat-logs/${id}`,
  //     data
  //   );
  // }

  // deleteStudy(id, type): Observable<any> {
  //   return this.http.delete(`study/delete/${id}/${type}`);
  // }

  // downloadFile(urlPath, fileResType) {
  //   return this.http.get(`${urlPath}, ${fileResType}`);
  // }

  // getStudyStatus() {
  //   if (localStorage.getItem("isStudyActive")) {
  //     return JSON.parse(localStorage.getItem("isStudyActive"));
  //   }
  //   return null;
  // }

  // uploadStudyLogo(imgData) {
  //   return this.http.post("study/upload-logo", imgData);
  // }

  // generateBillableItem(data) {
  //   return this.http.post("finance/generate-billable-item", data);
  // }

  // archiveStudy(data): Observable<any> {
  //   return this.http.post("study/archive-study", data);
  // }

  // // Archive Actions
  // archiveActionArray(isAdmin, rows) {
  //   const actionArray = [];
  //   // Indexes where archive or unarchive should display based on studyStatus
  //   const toggleIconsIndexes = rows.reduce(
  //     (acc, curr, idx) =>
  //       curr.studyStatus === "Archive"  [...acc, idx] : acc,
  //     []
  //   );

  //   if (isAdmin) {
  //     actionArray.push({
  //       icon: "archive",
  //       function: "archiveEntity",
  //       color: "warn",
  //       tooltip: "Archive Study",
  //       toggleIcons: {
  //         icon: "unarchive",
  //         index: toggleIconsIndexes,
  //         tooltip: "Re-Enable Study",
  //       },
  //     });
  //   }

  //   return actionArray;
  // }

  // createUpdateClinicalTrialAgreement(studyProtocol): Observable<any> {
  //   return this.http.put(
  //     "study/study-clinical-trial-agreement/update/",
  //     studyProtocol
  //   );
  // }

  // uploadClinicalTrialAgreementDocument(protocolDocument): Observable<any> {
  //   return this.http.post(
  //     "study/upload-clinical-trial-agreement",
  //     protocolDocument
  //   );
  // }

  // getClinicalTrialAgreementList(params): Observable<any> {
  //   return this.http.post("study/study-clinical-trial-agreement", params);
  // }

  // deleteClinicalTrialAgreement(oid): Observable<any> {
  //   return this.http.delete(
  //     "study/study-clinical-trial-agreement/delete/" + oid
  //   );
  // }

  // studyEmailAuth(): Observable<any> {
  //   return this.http.get("email/created-auth-gmail-url");
  // }

  // studyEmailList(data: FilterParams): Observable<List<StudyEmail>> {
  //   return this.http.post<List<StudyEmail>>("email/list", data);
  // }

  // syncStudyEmail(data: { study_oid: string }): Observable<any> {
  //   return this.http.post("email", data);
  // }

  // getMailDetails(email_oid: string): Observable<GetOne<MailDetails>> {
  //   return this.http.get<GetOne<MailDetails>>("email/get-email/" + email_oid);
  // }

  // createGroup(data: GoogleGroup): Observable<Update<GoogleGroup>> {
  //   return this.http.post<Update<GoogleGroup>>("email/create-group", data);
  // }

  // updateGroup(data: GoogleGroup): Observable<Update<object>> {
  //   return this.http.post<Update<object>>("email/update-group", data);
  // }

  // addMemberInGroup(data: GoogleGroupMember): Observable<Update<object>> {
  //   return this.http.post<Update<object>>("email/add-group-members", data);
  // }

  // isGroupCreated(data: { study_oid: string }): Observable<GetOne<StudyGroup>> {
  //   return this.http.post<GetOne<StudyGroup>>("email/get-group-info", data);
  // }

  // groupMemberList(data: FilterParams): Observable<List<MemberList>> {
  //   return this.http.post<List<MemberList>>("email/get-member-user-list", data);
  // }

  // memberList(data): Observable<any> {
  //   return this.http.post("email/group-members-list", data);
  // }

  // updateMember(data: GoogleGroupMember): Observable<Update<object>> {
  //   return this.http.post<Update<object>>("email/update-group-members", data);
  // }

  // // Remove member from google groups
  // removeMember(data: {
  //   study_oid: string;
  //   oid: string;
  // }): Observable<Delete<object>> {
  //   return this.http.post<Delete<object>>("email/remove-group-member", data);
  // }

  // // Sync google group members
  // syncMembers(data: { oid: string }): Observable<Update<object>> {
  //   return this.http.post<Update<object>>("email/member-sync", data);
  // }

  // // Sync Group
  // syncGroup(data: { oid: string }): Observable<Update<object>> {
  //   return this.http.post<Update<object>>("email/group-sync", data);
  // }

  // deleteCtaDocument(oid): Observable<any> {
  //   return this.http.delete(
  //     "study/delete-upload-study-clinical-trial-document/delete/" + oid + "/global"
  //   );
  // }

  // studyEformList(data): Observable<any> {
  //   return this.http.post("study/eform", data);
  // }

  // studyEformUpdate(data): Observable<any> {
  //   return this.http.put("study/eform/update", data);
  // }

  // studyEformCreate(data): Observable<any> {
  //   return this.http.post("study/eform/create", data);
  // }

  // getOneEFormsData(oid): Observable<any> {
  //   return this.http.get("study/eform/get-one-eform/" + oid);
  // }

  // studyEformDelete(oid,id): Observable<any> {
  //   if(id){
  //     return this.http.delete('study/eform/delete/' + oid +  '/global' + `study_version_id=${id}`);
  //   }else{
  //     return this.http.delete('study/eform/delete/' + oid);
  //   }
  // }

  // // Get Study Version List
  // getStudyVersionList(
  //   filterParams: FilterParams
  // ): Observable<List<StudyVersion>> {
  //   return this.http.post<List<StudyVersion>>("study/version", filterParams);
  // }



  // // Lock Unlock Study
  // updateStudyLockStatus(data): Observable<any> {
  //   return this.http.post("global/study/toggle-lock", data);
  // }
