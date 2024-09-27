import { createInjectable } from 'ngxtension/create-injectable';
import { HttpClient, HttpContext, HttpHandler, HttpHeaders } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'environments/environment';
import { Members } from '../interfaces/google-group.interface';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});

const SPINNER_SUBJECT = "spinnerSubject";
const MODULE_SUBJECT = "moduleSubject";
const IS_PROCEDURE_ACTIVE = "isProcedureActive";
const STUDY_PATH = "studyPath";
const STUDY_ID = "studyId";
const SUBJECT_VISIT_OID = "subjectVisitOid";
const IS_STUDY_SELECTED = "isStudySelected";
const IS_DELEGATION_ROLE_ACCEPT = "isDelegationRoleAccept";
const GOOGLE_GROUP_MEMBERS = "googleGroupMembers";

const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};

export const BroadcasterV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);

  const spinnerSubject = signal<boolean | null>(false);
  const moduleSubject = signal<boolean | null>(false);
  const isProcedureActive = signal<boolean | null>(true);
  const studyPath = signal<string | null>('');
  const studyId = signal<number | null>(0);
  const subjectVisitOid = signal<string | null>('');
  const isStudySelected = signal<boolean | null>(false);
  const isDelegationRoleAccept = signal<boolean | null>(false);
  const googleGroupMembers = signal<Members | null>(null);

  const loading = signal(false);
  const error = signal<string | null>(null);


  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonspinnerSubject = JSON.parse(window.sessionStorage.getItem(SPINNER_SUBJECT) || null);
      spinnerSubject.set(jsonspinnerSubject)
      const jsonmoduleSubject = JSON.parse(window.sessionStorage.getItem(MODULE_SUBJECT) || null);
      moduleSubject.set(jsonmoduleSubject)
      const jsonisProcedureActive = JSON.parse(window.sessionStorage.getItem(IS_PROCEDURE_ACTIVE) || null);
      isProcedureActive.set(jsonisProcedureActive)
      const jsonstudyPath = JSON.parse(window.sessionStorage.getItem(STUDY_PATH) || null);
      studyPath.set(jsonstudyPath)
      const jsonstudyId = JSON.parse(window.sessionStorage.getItem(STUDY_ID) || null);
      studyId.set(jsonstudyId)
      const jsonsubjectVisitOid = JSON.parse(window.sessionStorage.getItem(SUBJECT_VISIT_OID) || null);
      subjectVisitOid.set(jsonsubjectVisitOid)
      const jsonisStudySelected = JSON.parse(window.sessionStorage.getItem(IS_STUDY_SELECTED) || null);
      isStudySelected.set(jsonisStudySelected)
      const jsonisDelegationRoleAccept = JSON.parse(window.sessionStorage.getItem(IS_DELEGATION_ROLE_ACCEPT) || null);
      isDelegationRoleAccept.set(jsonisDelegationRoleAccept)
      const jsongoogleGroupMembers = JSON.parse(window.sessionStorage.getItem(GOOGLE_GROUP_MEMBERS) || null);
      googleGroupMembers.set(jsongoogleGroupMembers)
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
      encryptStorage.setItem(SPINNER_SUBJECT, JSON.stringify(spinnerSubject()));
      encryptStorage.setItem(MODULE_SUBJECT, JSON.stringify(moduleSubject()));
      encryptStorage.setItem(IS_PROCEDURE_ACTIVE, JSON.stringify(isProcedureActive()));
      encryptStorage.setItem(STUDY_PATH, JSON.stringify(studyPath()));
      encryptStorage.setItem(STUDY_ID, JSON.stringify(studyId()));
      encryptStorage.setItem(SUBJECT_VISIT_OID, JSON.stringify(subjectVisitOid()));
      encryptStorage.setItem(IS_STUDY_SELECTED, JSON.stringify(isStudySelected()));
      encryptStorage.setItem(IS_DELEGATION_ROLE_ACCEPT, JSON.stringify(isDelegationRoleAccept()));
      encryptStorage.setItem(GOOGLE_GROUP_MEMBERS, JSON.stringify(googleGroupMembers()));      

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
      encryptStorage.removeItem(SPINNER_SUBJECT);
      encryptStorage.removeItem(MODULE_SUBJECT);
      encryptStorage.removeItem(IS_PROCEDURE_ACTIVE);
      encryptStorage.removeItem(STUDY_PATH);
      encryptStorage.removeItem(STUDY_ID);
      encryptStorage.removeItem(SUBJECT_VISIT_OID);
      encryptStorage.removeItem(IS_STUDY_SELECTED);
      encryptStorage.removeItem(IS_DELEGATION_ROLE_ACCEPT);
      encryptStorage.removeItem(GOOGLE_GROUP_MEMBERS);
    } catch(err) {
      error.set(err)
      console.error('Error removing user from storage:', err);
    }
    loading.set(false);
  }

  const setCredentials = (data) => {
    loading.set(true);
    error.set(null);  
    loading.set(false);
  }



  return {
    spinnerSubject: computed(() => spinnerSubject()),
    moduleSubject: computed(() => moduleSubject()),
    isProcedureActive: computed(() => isProcedureActive()),
    studyPath: computed(() => studyPath()),
    studyId: computed(() => studyId()),
    subjectVisitOid: computed(() => subjectVisitOid()),
    isStudySelected: computed(() => isStudySelected()),
    isDelegationRoleAccept: computed(() => isDelegationRoleAccept()),
    googleGroupMembers: computed(() => googleGroupMembers()),
    loading: computed(() => loading()),
    error: computed(() => error()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    setCredentials,
  };


});