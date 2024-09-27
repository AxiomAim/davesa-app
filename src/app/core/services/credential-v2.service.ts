import { createInjectable } from 'ngxtension/create-injectable';
import { HttpClient, HttpContext, HttpHandler, HttpHeaders } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { UserRoleEnum } from '../enum/userRole.enum';
import { List } from '../interfaces/generics/list.interface';
import { FilterParams } from '../types/filter-params.type';
import { tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { EditCreateEntityData, EntityData } from '../interfaces/entity-data.interface';
import { CreateResponse } from '../interfaces/response.interface';
import { Delete } from '../interfaces/generics/delete.interface';
import { Update } from '../interfaces/generics/update.interface';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'environments/environment';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});


const CREDENTIALS = "credentials";

const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};

export const CredentialV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const credentials = signal<Credential[] | null>(null);
  const user = signal<User | null>(null);

  const loading = signal(false);
  const error = signal<string | null>(null);


  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsoncredentials = JSON.parse(window.sessionStorage.getItem(CREDENTIALS) || null);
      credentials.set(jsoncredentials)
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
      window.sessionStorage[CREDENTIALS] =JSON.stringify(credentials());
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
      window.sessionStorage.removeItem(CREDENTIALS);
    } catch(err) {
      error.set(err)
      console.error('Error removing user from storage:', err);
    }
    loading.set(false);
  }

  const setCredentials = (data) => {
    loading.set(true);
    error.set(null);  
    credentials.set(data)
    loading.set(false);
  }


  const getAll = (params: FilterParams) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<List<Credential>>('admin/credential', 
        params,
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          credentials.set(res.data)
          loading.set(false);
          return credentials()
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const deleteItem = (oid) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.delete<Delete<object>>('admin/entityData/delete/' + oid, 
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          loading.set(false);
          return res()
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const createItem = (postData: Credential) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<CreateResponse>('admin/credential/create', 
      postData,
      httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          loading.set(false);
          return res()
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const updateItem = (postData: Credential) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.put<Update<object>>('admin/credential/update/',
      postData, 
      httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          loading.set(false);
          return res()
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  return {
    credentials: computed(() => credentials()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    setCredentials,
    getAll,
    createItem,
    deleteItem,
    updateItem

  };


});