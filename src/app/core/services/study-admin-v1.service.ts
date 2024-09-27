import { HttpClient, HttpContext } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { FilterParams } from "../types/filter-params.type";
import { Study, StudyContacts, StudyVersion } from "../interfaces/study.interface";
import { GetOne } from "../interfaces/generics/getOne.interface";
import { StudyDelegationRole } from "../interfaces/study-delegation-role.interface";
import { ChatStatusLog } from "../interfaces/chat.interface";
import { MailDetails, StudyEmail, StudyGroup } from "../interfaces/study-email.interface";
import { GoogleGroup, GoogleGroupMember, MemberList } from "../interfaces/google-group.interface";
import { Update } from "../interfaces/generics/update.interface";
import { Delete } from "../interfaces/generics/delete.interface";
import { List } from "../interfaces/generics/list.interface";
import { DAVESA_AUTH_API } from "../auth-davesa/auth-davesa-api.interceptor";

const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};


@Injectable({
  providedIn: "root",
})
export class StudyAdminV1Service {
  private dataSub = new BehaviorSubject(null);
  currentStudyName = this.dataSub.asObservable();

  private _currentStudy = new BehaviorSubject(null);
  currentStudy = this._currentStudy.asObservable();

  getEmptyStudy = () => {
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
    return emptyStudy;
  }

  constructor(private http: HttpClient) {}

  changeDefaultStudyName(value) {
    this.dataSub.next(value);
  }

  setCurrentStudy(studyData) {
    this._currentStudy.next(studyData);
  }

  getStudyList(params: FilterParams): Observable<List<Study>> {
    let studies =  this.http.post<List<Study>>("study", params, httpOptions);
    studies.pipe(tap((res:any) => {
    })).subscribe()
    return studies
  }

  getStudyById(studyId: string): Observable<GetOne<Study>> {
    return this.http.get<GetOne<Study>>("study/get-one-study/" + studyId, httpOptions);
  }

  createStudy(data): Observable<any> {
    return this.http.post("study/create", data, httpOptions);
  }

  updateStudy(study: any): Observable<any> {
    return this.http.put("study/update/" + study.oid, study, httpOptions);
  }

  getStudyDelegationRole(filterParams): Observable<any> {
    return this.http.post("study/study-delegation-role", filterParams, httpOptions);
  }

  saveDelegationLog(studyDelegationLog): Observable<any> {
    return this.http.put("study/delegation-log/update", studyDelegationLog, httpOptions);
  }

  createUpdateStudyDelegationRole(
    studyDelegationRole: StudyDelegationRole
  ): Observable<any> {
    return this.http.put(
      "study/study-delegation-role/update/" + studyDelegationRole.oid,
      studyDelegationRole, httpOptions
    );
  }

  deleteStudyDelegationRole(oid): Observable<any> {
    return this.http.delete("study/study-delegation-role/delete/" + oid, httpOptions);
  }

  createUpdateProtocol(studyProtocol): Observable<any> {
    return this.http.put("study/study-protocol/update/", studyProtocol, httpOptions);
  }

  uploadProtocolDocument(protocolDocument): Observable<any> {
    return this.http.post("study/upload-protocol", protocolDocument, httpOptions);
  }

  getProtocolList(params): Observable<any> {
    return this.http.post("study/study-protocol", params, httpOptions);
  }

  deleteProtocol(oid, auditTrail?: any): Observable<any> {
    const bodyOption = { 
      body: auditTrail,
      ...httpOptions
     };
    return this.http.delete("study/study-protocol/delete/" + oid, bodyOption, );
  }

  getDelegationLogWithUser(studyId): Observable<any> {
    return this.http.get(
      "study/delegation-log/get-delegation-role-association-user/" + studyId, httpOptions
    );
  }

  getUserStudyList(params): Observable<any> {
    return this.http.post("study/list-study-by-user", params, httpOptions);
  }

  updateDefaultStudyByUser(studyId): Observable<any> {
    return this.http.put("study/update-study-by-user", studyId, httpOptions);
  }

  getUserDefaultStudy(): Observable<any> {
    return this.http.get("study/get-default-study", httpOptions);
  }

  getStudyOnsiteUser(data): Observable<any> {
    return this.http.post("study/site-account-by-onsite-user-list", data, httpOptions);
  }

  cloneStudy(data): Observable<any> {
    return this.http.post("study/clone-study", data, httpOptions);
  }

  exportStudyInformation(studyOid): Observable<any> {
    return this.http.get("study/export/" + studyOid, httpOptions);
  }

  getStudyContacts(params: FilterParams): Observable<List<StudyContacts>> {
    return this.http.post<List<StudyContacts>>("study/study-contact", params, httpOptions);
  }

  saveStudyContact(params): Observable<any> {
    return this.http.post("study/study-contact/create", params, httpOptions);
  }

  updateStudyContact(data): Observable<any> {
    return this.http.put("study/study-contact/update", data, httpOptions);
  }

  deleteStudyContact(oid): Observable<any> {
    return this.http.delete("study/study-contact/delete/" + oid, httpOptions);
  }

  getBankAccountDetailBySiteAccount(id): Observable<any> {
    return this.http.get("study/bank-details/" + id, httpOptions);
  }

  getChatStatusLogs(id: string, data: FilterParams): Observable<List<ChatStatusLog>> {
    return this.http.post<List<ChatStatusLog>>(`chat/get-status-chat-logs/${id}`, data, httpOptions);
  }

  deleteStudy(id): Observable<any> {
    return this.http.delete(`study/delete/${id}`, httpOptions);
  }

  downloadFile(urlPath, fileResType) {
    return this.http.get(`${urlPath}, ${fileResType}`, httpOptions);
  }

  getStudyStatus() {
    if (localStorage.getItem("isStudyActive")) {
      return JSON.parse(localStorage.getItem("isStudyActive"));
    }
    return null;
  }

  uploadStudyLogo(imgData) {
    return this.http.post("study/upload-logo", imgData, httpOptions);
  }

  generateBillableItem(data) {
    return this.http.post("finance/generate-billable-item", data, httpOptions);
  }

  archiveStudy(data): Observable<any> {
    return this.http.post("study/archive-study", data, httpOptions);
  }

  // Archive Actions
  archiveActionArray(isAdmin, rows) {
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

  createUpdateClinicalTrialAgreement(studyProtocol): Observable<any> {
    return this.http.put(
      "study/study-clinical-trial-agreement/update/",
      studyProtocol, httpOptions
    );
  }

  uploadClinicalTrialAgreementDocument(protocolDocument): Observable<any> {
    return this.http.post(
      "study/upload-clinical-trial-agreement",
      protocolDocument, httpOptions
    );
  }

  getClinicalTrialAgreementList(params): Observable<any> {
    return this.http.post("study/study-clinical-trial-agreement", params, httpOptions);
  }

  deleteClinicalTrialAgreement(oid): Observable<any> {
    return this.http.delete(
      "study/study-clinical-trial-agreement/delete/" + oid, httpOptions
    );
  }

  studyEmailAuth(): Observable<any> {
    return this.http.get("email/created-auth-gmail-url", httpOptions);
  }

  studyEmailList(data: FilterParams): Observable<List<StudyEmail>> {
    return this.http.post<List<StudyEmail>>("email/list", data, httpOptions);
  }

  syncStudyEmail(data: { study_oid: string; }): Observable<any> {
    return this.http.post("email", data, httpOptions);
  }

  getMailDetails(email_oid: string): Observable<GetOne<MailDetails>> {
    return this.http.get<GetOne<MailDetails>>("email/get-email/" + email_oid, httpOptions);
  }

  createGroup(data: GoogleGroup): Observable<Update<GoogleGroup>> {
    return this.http.post<Update<GoogleGroup>>("email/create-group", data, httpOptions);
  }

  updateGroup(data: GoogleGroup): Observable<Update<object>> {
    return this.http.post<Update<object>>("email/update-group", data, httpOptions);
  }

  addMemberInGroup(data: GoogleGroupMember): Observable<Update<object>> {
    return this.http.post<Update<object>>("email/add-group-members", data, httpOptions);
  }

  isGroupCreated(data: { study_oid: string; }): Observable<GetOne<StudyGroup>> {
    return this.http.post<GetOne<StudyGroup>>("email/get-group-info", data, httpOptions);
  }

  groupMemberList(data: FilterParams): Observable<List<MemberList>> {
    return this.http.post<List<MemberList>>("email/get-member-user-list", data, httpOptions);
  }

  memberList(data): Observable<any> {
    return this.http.post("email/group-members-list", data, httpOptions);
  }

  updateMember(data: GoogleGroupMember): Observable<Update<object>> {
    return this.http.post<Update<object>>("email/update-group-members", data, httpOptions);
  }

  // Remove member from google groups
  removeMember(data: { study_oid: string; oid: string; }): Observable<Delete<object>>{
    return this.http.post<Delete<object>>("email/remove-group-member",data, httpOptions);
  }

  // Sync google group members
  syncMembers(data: { oid: string; }): Observable<Update<object>>{
    return this.http.post<Update<object>>("email/member-sync",data, httpOptions);
  }

  // Sync Group 
  syncGroup(data: { oid: string; }): Observable<Update<object>>{
    return this.http.post<Update<object>>("email/group-sync",data, httpOptions);
  }
  
  deleteCtaDocument(oid):Observable<any>{
    return this.http.delete('study/delete-upload-study-clinical-trial-document/delete/'+oid, httpOptions);
  }

  studyEformList(data): Observable<any> {
    return this.http.post("study/eform", data, httpOptions);
  }

  studyEformUpdate(data): Observable<any> {
    return this.http.put("study/eform/update", data, httpOptions);
  }

  studyEformCreate(data): Observable<any> {
    return this.http.post("study/eform/create", data, httpOptions);
  }

  getOneEFormsData(oid): Observable<any> {
    return this.http.get("study/eform/get-one-eform/"+oid, httpOptions);
  }

  studyEformDelete(oid): Observable<any> {
    return this.http.delete("study/eform/delete/"+oid, httpOptions);
  }

}
