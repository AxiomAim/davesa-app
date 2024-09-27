import { createInjectable } from 'ngxtension/create-injectable';
import { EncryptStorage } from 'encrypt-storage';
import { HttpClient, HttpContext } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { FilterParams } from '../types/filter-params.type';
import { List } from 'lodash';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Participant } from '../interfaces/participant.interface';
import { Study } from '../interfaces/study.interface';
import { GetOne } from '../interfaces/generics/getOne.interface';


export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});

const STUDY_OID = "studyOid";
const STUDY = "study";
const PARTICIPANT = "participant";
const VISITS = "visits";
const VISIT = "visit";
const VISIT_STATUS = "visit-status";
const CLINIC_BOARD = "clinicBoard";

const httpOptions = {
    context: new HttpContext().set(DAVESA_AUTH_API, true)
  };

export const VisitsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);

  const studyOid = signal<string | null>(null);
  const study = signal<Study | null>(null);
  const participant = signal<Participant | null>(null);
  const visits = signal<any[] | null>(null);
  const visit = signal<any | null>(null);
  const visitStatus = signal<any | null>(null);
  const clinicBoard = signal<any | null>(null);

  const loading = signal(false);
  const error = signal<string | null>(null);


  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonParticipant = encryptStorage.getItem(PARTICIPANT);
      participant.set(jsonParticipant)
      const jsonvisits = encryptStorage.getItem(VISITS);
      visits.set(jsonvisits)
      const jsonvisit = encryptStorage.getItem(VISIT);
      visit.set(jsonvisit)
      const jsonvisitStatus = encryptStorage.getItem(VISIT_STATUS);
      visitStatus.set(jsonvisitStatus)
      const jsonclinicBoard = encryptStorage.getItem(CLINIC_BOARD);
      clinicBoard.set(jsonclinicBoard)

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
      encryptStorage.setItem(PARTICIPANT, JSON.stringify(participant()));
      encryptStorage.setItem(VISITS, JSON.stringify(visits()));
      encryptStorage.setItem(VISIT, JSON.stringify(visit()));
      encryptStorage.setItem(VISIT_STATUS, JSON.stringify(visitStatus()));
      encryptStorage.setItem(CLINIC_BOARD, JSON.stringify(clinicBoard()));
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
      encryptStorage.removeItem(PARTICIPANT);
      encryptStorage.removeItem(VISITS);
      encryptStorage.removeItem(VISIT);
      encryptStorage.removeItem(VISIT_STATUS);
      encryptStorage.removeItem(CLINIC_BOARD);
    } catch(err) {
      error.set(err)
      console.error('Error removing user from storage:', err);
    }
    loading.set(false);
  }

  const getAll = (params: any) => {
    loading.set(true);
    error.set(null);  
    return getStudytByOid(studyOid()).pipe(
      switchMap((res: any) => {
          study.set(res.data)
          setToStorage()
          return _httpClient.post<List<any>>('subject/get-all-subject-visit-by-filter',
            params,
            httpOptions
          ).pipe(
            tap({
              next: (res: any) => {
                visits.set(res.data)
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
      }))
  }

  const getByOid = (oid:string) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.get<List<any>>('subject/get-one-subject-visit/'+oid, httpOptions)
    .pipe(
      tap({
        next: (res: any) => {
          visit.set(res.data)
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

  const getStudytByOid = (id: string) => {
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


  const getAllByType = (params: FilterParams) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.get<List<any>>('subject/visit', {
      params,
      ...httpOptions
    }).pipe(
      tap({
        next: (res: any) => {
          visits.set(res.data)
          setToStorage()
          loading.set(false);
          return visits()
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const setStudy = (data) => {
    loading.set(true);
    error.set(null);  
    study.set(data)
    setToStorage()
    loading.set(false);
  }

  const setParticipant = (data) => {
    loading.set(true);
    error.set(null);  
    participant.set(data)
    setToStorage()
    loading.set(false);
  }

  const setVisit = (data) => {
    loading.set(true);
    error.set(null);  
    visit.set(data)
    setToStorage()
    loading.set(false);
  }

  const setVisits = (data) => {
    loading.set(true);
    error.set(null);  
    visits.set(data)
    setToStorage()
    loading.set(false);
  }

  const setVisitStatus = (data) => {
    loading.set(true);
    error.set(null);  
    visitStatus.set(data)
    setToStorage()
    loading.set(false);
  }

  const setStudyOid = (data) => {
    loading.set(true);
    error.set(null);  
    studyOid.set(data)
    setToStorage()
    loading.set(false);
  }

  const getClinicBoard = (params: FilterParams): Observable<Participant[]> => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<List<Participant[]>>('subject/get-appointment-by-study', 
      params,
      httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          clinicBoard.set(res.data)
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

  return {
    studyOid: computed(() => studyOid()),
    study: computed(() => study()),
    participant: computed(() => participant()),
    visits: computed(() => visits()),
    visit: computed(() => visit()),
    visitStatus: computed(() => visitStatus()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    getAll,
    getByOid,
    getAllByType,
    getStudytByOid,
    getClinicBoard,
    setStudy,
    setParticipant,
    setVisits,
    setVisit,
    setStudyOid,
    setVisitStatus

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
