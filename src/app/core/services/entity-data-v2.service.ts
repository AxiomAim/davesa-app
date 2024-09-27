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
import { AuthDavesaApiService } from '../auth-davesa/auth-davesa-api.service';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});

const ENTITY_DATA = "entityData";

const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};

export const EntityDataV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _authDavesaApiService = inject(AuthDavesaApiService);
  const entityData = signal<EntityData[] | null>(null);
  const user = signal<User | null>(null);

  const loading = signal(false);
  const error = signal<string | null>(null);


  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonentitydata = JSON.parse(window.sessionStorage.getItem(ENTITY_DATA) || null);
      entityData.set(jsonentitydata)
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
      window.sessionStorage[ENTITY_DATA] =JSON.stringify(entityData());
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
      window.sessionStorage.removeItem(ENTITY_DATA);
    } catch(err) {
      error.set(err)
      console.error('Error removing user from storage:', err);
    }
    loading.set(false);
  }

  const setUserDetails = (data) => {
    loading.set(true);
    error.set(null);  
    entityData.set(data)
    loading.set(false);
  }


  const getAll = (params: FilterParams) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<List<EntityData>>('admin/entityData', 
        params,
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {
          entityData.set(res.data)
          loading.set(false);
          return entityData()
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const deleteItem = (postData: EntityData) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.delete<Delete<object>>('admin/entityData/delete/' + postData.entity_id + "/" + postData.oid, 
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

  const createItem = (postData: EditCreateEntityData) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.post<CreateResponse>('admin/entityData/create', 
      {
        name: postData.name,
        entity_id: postData.entity_id,
      },
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

  const updateItem = (postData: EditCreateEntityData) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.put<Update<object>>('admin/entityData/update/' + postData.oid,
      {
        name: postData.name,
      }
      , httpOptions
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
    entityData: computed(() => entityData()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    setUserDetails,
    getAll,
    createItem,
    deleteItem,
    updateItem

  };


});