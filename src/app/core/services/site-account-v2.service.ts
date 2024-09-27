import { createInjectable } from 'ngxtension/create-injectable';
import { EncryptStorage } from 'encrypt-storage';
import { HttpClient, HttpContext, HttpHandler, HttpHeaders } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { FilterParams } from '../types/filter-params.type';
import { List } from 'lodash';
import { SiteAccount, SiteAccountCreateEdit, UploadLogoPayload } from '../interfaces/site-account.interface';
import { environment } from 'environments/environment';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});

const SITE_ACCOUNT = "site-account";
const PARTICIPANT = "participant";

const httpOptions = {
    context: new HttpContext().set(DAVESA_AUTH_API, true)
  };

export const SiteAccountV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const siteAccount = signal<any | null>(null);
  const participant = signal<any | null>(null);

  const loading = signal(false);
  const error = signal<string | null>(null);


  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonpsiteAccount = encryptStorage.getItem(SITE_ACCOUNT);
      siteAccount.set(jsonpsiteAccount)

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
      encryptStorage.setItem(SITE_ACCOUNT, JSON.stringify(siteAccount()));
    } catch(err) {
      error.set(err)
      console.error('Error setting user to storage:', err);
    }
    loading.set(false);

  }

  const removeFromStorage = () => {
    loading.set(true);
    error.set(null);  
    siteAccount.set(null)
    try {
      encryptStorage.removeItem(SITE_ACCOUNT);
    } catch(err) {
      error.set(err)
      console.error('Error removing user from storage:', err);
    }
    loading.set(false);
  }

  const setSiteAccount = (data) => {
    loading.set(true);
    error.set(null);  
    siteAccount.set(data)
    loading.set(false);
  }

  const emptySiteAccount = () => {
    loading.set(true);
    error.set(null);  
    removeFromStorage();
    loading.set(false);
  }

  const getAll = (params: FilterParams) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<List<SiteAccount>>('site-account', 
        params,
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

  const getById = (oid: string) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.get('site-account/get-one-site-account' + oid, 
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          loading.set(false);
          siteAccount.set(res.data)
          return res
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const createItem = (siteAccount: SiteAccountCreateEdit) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post('site-account', 
      siteAccount,
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

  const updateItem = (siteAccount: SiteAccountCreateEdit) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.put('site-account/update', 
      siteAccount,
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

  const deleteItem = (oid: string) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.put('site-account/delete/'  + oid, 
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

  const uploadLogo = (imgData: UploadLogoPayload) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post('site-account/upload-logo', 
      imgData,
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


  return {
    siteAccount: computed(() => siteAccount()),
    participant: computed(() => participant()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    setSiteAccount,
    emptySiteAccount,
    getAll,
    getById,
    createItem,
    updateItem,
    deleteItem,
    uploadLogo
  };


});