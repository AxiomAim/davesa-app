import { createInjectable } from 'ngxtension/create-injectable';
import { EncryptStorage } from 'encrypt-storage';
import { HttpClient, HttpContext } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GetOne } from "../interfaces/generics/getOne.interface";
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { Study, StudyContacts, StudyVersion } from '../interfaces/study.interface';
import { FilterParams } from '../types/filter-params.type';
import { List } from 'lodash';
import { StudyEmail } from '../interfaces/study-email.interface';
import { environment } from 'environments/environment';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});


const STUDIES = "studies";
const STUDY = "study";
const STUDY_CONTACTS = "studyContacts";
const DATA_SUB = "dataSub";
const CURRENT_STUDY = "currentStudy";

const httpOptions = {
    context: new HttpContext().set(DAVESA_AUTH_API, true)
  };

export const StudiesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const studies = signal<Study[] | null>(null);
  const newStudy = signal<Study | null>(null);
  const study = signal<Study | null>(null);
  const studyContacts = signal<StudyContacts[] | null>(null);
  const dataSub = signal<any | null>(null);
  const currentStudy = signal<any | null>(null);
  const mail = signal<StudyEmail[] | null>(null);

  const loading = signal(false);
  const error = signal<string | null>(null);


  const changeStudy = (study: Study) => {
    loading.set(true);
    error.set(null);  
    dataSub.set(study)
    loading.set(false);
  }


  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonorgStudies = encryptStorage.getItem(STUDIES);
      studies.set(jsonorgStudies)
      const jsonStudy = encryptStorage.getItem(STUDY);
      study.set(jsonStudy)
      const jsondataSub = encryptStorage.getItem(DATA_SUB);
      dataSub.set(jsondataSub)
      const jsonscurrentStudy = encryptStorage.getItem(CURRENT_STUDY);
      currentStudy.set(jsonscurrentStudy)
      const jsonStudyContacts = encryptStorage.getItem(STUDY_CONTACTS);
      currentStudy.set(jsonStudyContacts)

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
      encryptStorage.setItem(STUDIES, JSON.stringify(studies()));
      encryptStorage.setItem(STUDY, JSON.stringify(study()));
      encryptStorage.setItem(DATA_SUB, JSON.stringify(dataSub()));
      encryptStorage.setItem(CURRENT_STUDY, JSON.stringify(currentStudy()));
      encryptStorage.setItem(STUDY_CONTACTS, JSON.stringify(studyContacts()));
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
      encryptStorage.removeItem(STUDIES);
      encryptStorage.removeItem(STUDY);
      encryptStorage.removeItem(DATA_SUB);
      encryptStorage.removeItem(CURRENT_STUDY);
      encryptStorage.removeItem(STUDY_CONTACTS);
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

  const getAll = (params: FilterParams) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<List<Study>>('study', 
        params,
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          studies.set(res.data)
          setToStorage()
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

  const getByOid = (id: string) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.get<GetOne<Study>>('study/get-one-study/' + id, httpOptions).pipe(
      tap({
        next: (res: any) => {
          study.set(res.data)
          setToStorage()
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

  const getByVersion = (id: string) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.get<GetOne<Study>>('study/version/get-one-version/' + id, httpOptions).pipe(
      tap({
        next: (res: any) => {
          study.set(res.data)
          setToStorage()
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


  const createItem = (data) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<GetOne<Study>>('study/create', data, httpOptions).pipe(
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

  const updateItem = (study: any) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.put<any>('study/update/' + study.oid, study, httpOptions).pipe(
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


  const getAllVersions = (params: FilterParams) => {
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

  const archiveItem = (data) => {
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

const deleteRole = (oid) => {
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

const deleteItem = (id, type) => {
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

const updateLockStatus = (data) => {
  loading.set(true);
  error.set(null);  
  return _httpClient.post("study/toggle-lock", data, httpOptions       
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


const getStudyContacts = (params: FilterParams) => {
  loading.set(true);
  error.set(null);  
  return _httpClient.post<List<StudyContacts>>('study/study-contact', 
      params,
      httpOptions
  ).pipe(
    tap({
      next: (res: any) => {
        studyContacts.set(res.data)  
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


  const getAllMail = (params: FilterParams) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<List<Study>>('email/list', 
        params,
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          mail.set(res.data)
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
    mail: computed(() => mail()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    changeStudy,
    getAll,
    getById: getByOid,
    getByVersion,
    getAllVersions,
    getProtocolList,
    createItem,
    updateItem,
    setCurrentStudy,
    archiveActionArray,
    archiveItem,
    deleteItem,
    generateBillableItem,
    updateLockStatus,
    deleteRole,
    getStudyContacts,
    getAllMail 

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
  //   return this.http.post("study/clone-study-global", data);
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
  //   return this.http.post("study/toggle-lock", data);
  // }
