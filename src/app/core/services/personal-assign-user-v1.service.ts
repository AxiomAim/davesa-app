import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { EncryptStorage } from 'encrypt-storage';
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
export class PersonalAssignUserV1Service {
  constructor(private http: HttpClient) {}

  getUserBasedOnDelegationRole = (data): Observable<any> => {
    return this.http.post(
      'study/delegation-role-assign-user/get-user-based-on-delegation-role',
      data, httpOptions
    );
  };

  getPersonalInviteUsers(params): Observable<any> {
    return this.http.post(
      'study/delegation-role-assign-user/get-user-by-delegation-role',
      params, httpOptions
    );
  }

  addAssigneduserToRole(data): Observable<any> {
    return this.http.post('study/delegation-role-assign-user/create', data, httpOptions);
  }

  deleteAssignedUserFromRole(oid): Observable<any> {
    return this.http.delete('study/delegation-role-assign-user/delete/' + oid, httpOptions);
  }

  getAssignUserRoles(data): Observable<any> {
    return this.http.post('study/delegation-role-assign-user', data, httpOptions);
  }

  sendNotificationToTaskUser = (data): Observable<any> => {
    return this.http.post('clinic/require-credential-send-notification', data, httpOptions);
  };

  removeUserFromRole = (data): Observable<any> => {
    return this.http.put(
      'study/delegation-role-assign-user/remove-user-by-delegation-role',
      data, httpOptions
    );
  };
}
