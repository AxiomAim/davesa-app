import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
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

@Injectable({
  providedIn: "root",
})
export class StudyConstructorV1Service {
  private dataSub = new BehaviorSubject(null);
  currentStudyName = this.dataSub.asObservable();

  private _currentStudy = new BehaviorSubject(null);
  currentStudy = this._currentStudy.asObservable();

  constructor(private http: HttpClient) {}

  changeDefaultStudyName(value) {
    this.dataSub.next(value);
  }

  setCurrentStudy(studyData) {
    this._currentStudy.next(studyData);
  }

  getStudyList(params: FilterParams): Observable<List<Study>> {
    return this.http.post<List<Study>>("global/study", params);
  }

  getStudyById(studyId: string): Observable<GetOne<Study>> {
    return this.http.get<GetOne<Study>>(
      "global/study/get-one-study/" + studyId
    );
  }

  getStudyVersionById(id): Observable<any> {
    return this.http.get(
      "study/version/get-one-version/" + id
    );
  }

  createStudy(data): Observable<any> {
    return this.http.post("global/study/create", data);
  }

  updateStudy(study: any): Observable<any> {
    return this.http.put("global/study/update/" + study.oid, study);
  }

  getStudyDelegationRole(filterParams): Observable<any> {
    return this.http.post("study/study-delegation-role", filterParams);
  }

  saveDelegationLog(studyDelegationLog): Observable<any> {
    return this.http.put("study/delegation-log/update", studyDelegationLog);
  }

  createUpdateStudyDelegationRole(
    studyDelegationRole: StudyDelegationRole
  ): Observable<any> {
    return this.http.put(
      "study/study-delegation-role/update/" + studyDelegationRole.oid,
      studyDelegationRole
    );
  }

  deleteStudyDelegationRole(oid): Observable<any> {
    return this.http.delete("study/study-delegation-role/delete/" + oid);
  }

  createUpdateProtocol(studyProtocol): Observable<any> {
    return this.http.put("study/study-protocol/update/", studyProtocol);
  }

  uploadProtocolDocument(protocolDocument): Observable<any> {
    return this.http.post("study/upload-protocol", protocolDocument);
  }

  getProtocolList(params): Observable<any> {
    return this.http.post("study/study-protocol", params);
  }

  deleteProtocol(oid, auditTrail?: any,id?:any): Observable<any> {
    const bodyOption = { body: auditTrail };
    return this.http.delete("study/study-protocol/delete/" + oid + "/global" + `?study_version_id=${id}`, bodyOption);
  }

  getDelegationLogWithUser(studyId): Observable<any> {
    return this.http.get(
      "study/delegation-log/get-delegation-role-association-user/" + studyId
    );
  }

  getUserStudyList(params): Observable<any> {
    return this.http.post("study/list-study-by-user", params);
  }

  updateDefaultStudyByUser(studyId): Observable<any> {
    return this.http.put("study/update-study-by-user", studyId);
  }

  getUserDefaultStudy(): Observable<any> {
    return this.http.get("study/get-default-study");
  }

  getStudyOnsiteUser(data): Observable<any> {
    return this.http.post("study/site-account-by-onsite-user-list", data);
  }

  cloneStudy(data): Observable<any> {
    return this.http.post("global/study/clone-study-global", data);
  }

  exportStudyInformation(studyOid): Observable<any> {
    return this.http.get("study/export/" + studyOid);
  }

  getStudyContacts(params: FilterParams): Observable<List<StudyContacts>> {
    return this.http.post<List<StudyContacts>>("study/study-contact", params);
  }

  saveStudyContact(params): Observable<any> {
    return this.http.post("study/study-contact/create", params);
  }

  updateStudyContact(data): Observable<any> {
    return this.http.put("study/study-contact/update", data);
  }

  deleteStudyContact(oid): Observable<any> {
    return this.http.delete("study/study-contact/delete/" + oid);
  }

  getBankAccountDetailBySiteAccount(id): Observable<any> {
    return this.http.get("study/bank-details/" + id);
  }

  getChatStatusLogs(
    id: string,
    data: FilterParams
  ): Observable<List<ChatStatusLog>> {
    return this.http.post<List<ChatStatusLog>>(
      `chat/get-status-chat-logs/${id}`,
      data
    );
  }

  deleteStudy(id, type): Observable<any> {
    return this.http.delete(`study/delete/${id}/${type}`);
  }

  downloadFile(urlPath, fileResType) {
    return this.http.get(`${urlPath}, ${fileResType}`);
  }

  getStudyStatus() {
    if (localStorage.getItem("isStudyActive")) {
      return JSON.parse(localStorage.getItem("isStudyActive"));
    }
    return null;
  }

  uploadStudyLogo(imgData) {
    return this.http.post("study/upload-logo", imgData);
  }

  generateBillableItem(data) {
    return this.http.post("finance/generate-billable-item", data);
  }

  archiveStudy(data): Observable<any> {
    return this.http.post("study/archive-study", data);
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
      studyProtocol
    );
  }

  uploadClinicalTrialAgreementDocument(protocolDocument): Observable<any> {
    return this.http.post(
      "study/upload-clinical-trial-agreement",
      protocolDocument
    );
  }

  getClinicalTrialAgreementList(params): Observable<any> {
    return this.http.post("study/study-clinical-trial-agreement", params);
  }

  deleteClinicalTrialAgreement(oid): Observable<any> {
    return this.http.delete(
      "study/study-clinical-trial-agreement/delete/" + oid
    );
  }

  studyEmailAuth(): Observable<any> {
    return this.http.get("email/created-auth-gmail-url");
  }

  studyEmailList(data: FilterParams): Observable<List<StudyEmail>> {
    return this.http.post<List<StudyEmail>>("email/list", data);
  }

  syncStudyEmail(data: { study_oid: string }): Observable<any> {
    return this.http.post("email", data);
  }

  getMailDetails(email_oid: string): Observable<GetOne<MailDetails>> {
    return this.http.get<GetOne<MailDetails>>("email/get-email/" + email_oid);
  }

  createGroup(data: GoogleGroup): Observable<Update<GoogleGroup>> {
    return this.http.post<Update<GoogleGroup>>("email/create-group", data);
  }

  updateGroup(data: GoogleGroup): Observable<Update<object>> {
    return this.http.post<Update<object>>("email/update-group", data);
  }

  addMemberInGroup(data: GoogleGroupMember): Observable<Update<object>> {
    return this.http.post<Update<object>>("email/add-group-members", data);
  }

  isGroupCreated(data: { study_oid: string }): Observable<GetOne<StudyGroup>> {
    return this.http.post<GetOne<StudyGroup>>("email/get-group-info", data);
  }

  groupMemberList(data: FilterParams): Observable<List<MemberList>> {
    return this.http.post<List<MemberList>>("email/get-member-user-list", data);
  }

  memberList(data): Observable<any> {
    return this.http.post("email/group-members-list", data);
  }

  updateMember(data: GoogleGroupMember): Observable<Update<object>> {
    return this.http.post<Update<object>>("email/update-group-members", data);
  }

  // Remove member from google groups
  removeMember(data: {
    study_oid: string;
    oid: string;
  }): Observable<Delete<object>> {
    return this.http.post<Delete<object>>("email/remove-group-member", data);
  }

  // Sync google group members
  syncMembers(data: { oid: string }): Observable<Update<object>> {
    return this.http.post<Update<object>>("email/member-sync", data);
  }

  // Sync Group
  syncGroup(data: { oid: string }): Observable<Update<object>> {
    return this.http.post<Update<object>>("email/group-sync", data);
  }

  deleteCtaDocument(oid): Observable<any> {
    return this.http.delete(
      "study/delete-upload-study-clinical-trial-document/delete/" + oid + "/global"
    );
  }

  studyEformList(data): Observable<any> {
    return this.http.post("study/eform", data);
  }

  studyEformUpdate(data): Observable<any> {
    return this.http.put("study/eform/update", data);
  }

  studyEformCreate(data): Observable<any> {
    return this.http.post("study/eform/create", data);
  }

  getOneEFormsData(oid): Observable<any> {
    return this.http.get("study/eform/get-one-eform/" + oid);
  }

  studyEformDelete(oid,id?): Observable<any> {
    if(id){
      return this.http.delete('study/eform/delete/' + oid +  '/global' + `?study_version_id=${id}`);
    }else{
      return this.http.delete('study/eform/delete/' + oid);
    }
  }

  // Get Study Version List
  getStudyVersionList(
    filterParams: FilterParams
  ): Observable<List<StudyVersion>> {
    return this.http.post<List<StudyVersion>>("study/version", filterParams);
  }

  // Lock Unlock Study
  updateStudyLockStatus(data): Observable<any> {
    return this.http.post("global/study/toggle-lock", data);
  }
}
