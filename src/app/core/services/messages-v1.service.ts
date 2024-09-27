import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';

const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};

@Injectable()
export class MessagesV1Service {
  constructor(private http: HttpClient) {}

  getNotificationList(filterParams): Observable<any> {
    return this.http.post('notification', {
      filterParams,
      ...httpOptions
    }
  );
  }

  updateNotification(notificationObject): Observable<any> {
    return this.http.put('notification/update', notificationObject, httpOptions);
  }
  markAllAsReadNotification(): Observable<any> {
    return this.http.get('notification/mark-all-as-read', httpOptions);
  }
  notificationCategories(filterParams): Observable<any> {
    return this.http.post('admin/notification-category', 
      {
        filterParams,
        ...httpOptions
      }
      );
  }
  notificationForEisf(userList): Observable<any> {
    return this.http.post('notification/bulk-create', 
      {
        userList,
        ...httpOptions
      }
    );
  }
}
