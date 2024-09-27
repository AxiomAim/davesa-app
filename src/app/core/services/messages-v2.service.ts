import { createInjectable } from 'ngxtension/create-injectable';
import { EncryptStorage } from 'encrypt-storage';
import { HttpClient, HttpContext } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { environment } from 'environments/environment';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});

const NOTIFICATIONS = "notifications";
const NOTIFICATION = "notification";
const NOTIFICATION_CATERGORIES = "notificationCategories";

const httpOptions = {
    context: new HttpContext().set(DAVESA_AUTH_API, true)
  };

export const MessagesV2Service = createInjectable(() => {

  const _httpClient = inject(HttpClient);
  const notifications = signal<any | null>(null);
  const notification = signal<any | null>(null);
  const notificationCategories = signal<any | null>(null);

  const loading = signal(false);
  const error = signal<string | null>(null);

  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonNotifications = encryptStorage.getItem(NOTIFICATIONS);
      notifications.set(jsonNotifications)
      const jsonNotification = encryptStorage.getItem(NOTIFICATION);
      notification.set(jsonNotification)
      const jsonNotificationCategories = encryptStorage.getItem(NOTIFICATION_CATERGORIES);
      notification.set(jsonNotificationCategories)
      
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
      encryptStorage.setItem(NOTIFICATIONS, JSON.stringify(notifications()));
      encryptStorage.setItem(NOTIFICATION, JSON.stringify(notification()));
      encryptStorage.setItem(NOTIFICATION_CATERGORIES, JSON.stringify(notificationCategories()));
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
      encryptStorage.removeItem(NOTIFICATIONS);
      encryptStorage.removeItem(NOTIFICATION);
      encryptStorage.removeItem(NOTIFICATION_CATERGORIES);
    } catch(err) {
      error.set(err)
      console.error('Error removing user from storage:', err);
    }
    loading.set(false);
  }


  const getAll = (params) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post('notification', 
        params,
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          notifications.set(res.data)
          setToStorage()
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

  const createItem = (data) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<any>('study/create', data, httpOptions).pipe(
      tap({
        next: (res: any) => {
          notification.set(res.data)
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

  const updateItem = (notificationObject: any) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.put<any>('notification/update/', notificationObject, httpOptions).pipe(
      tap({
        next: (res: any) => {
          notification.set(res.data)
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

  const markAllAsRead = () => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post('notification/mark-all-as-read', 
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


  const getAllBtCatergory = (params) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post('admin/notification-category', 
        params,
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          notification.set(res.data);
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

  const getAllForEisf = (userList) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post('notification/bulk-create', 
      userList,
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


  return {
    notifications: computed(() => notifications()),
    notification: computed(() => notification()),
    notificationCategories: computed(() => notificationCategories()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    getAll,
    createItem,
    updateItem,
    getAllForEisf,
    getAllBtCatergory,
    markAllAsRead,
  };

});

