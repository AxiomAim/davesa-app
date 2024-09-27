import { createInjectable } from 'ngxtension/create-injectable';
import { EncryptStorage } from 'encrypt-storage';
import { HttpClient, HttpContext, HttpHandler, HttpHeaders } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DAVESA_AUTH_API } from './auth-davesa-api.interceptor';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { PermissionsObj } from '../interfaces/permissions-obj.interface';
import jwt_decode from "jwt-decode";
import { UserRoleEnum } from '../enum/userRole.enum';
import { GetOne } from '../interfaces/generics/getOne.interface';
import { GoogleAuth } from '../interfaces/google-auth.interface';
import { GoogleUserProfile } from '../interfaces/google-user-profile.interface';

export const encryptStorage = new EncryptStorage('encrypt-davesa', {
  storageType: 'sessionStorage',
});

const USER_STORAGE_KEY = 'user';
const API_URL = environment.API_URL;
const { hostname } = new URL(window.location.href);
const TOKEN_KEY = "auth-token";
const DECODED_TOKEN_KEY = "decoded-token";
const USER = "user";
const ORG_DOMAIN = "orgDomain";
const USER_ROLE = "userRole";

const httpOptions = {
    context: new HttpContext().set(DAVESA_AUTH_API, true)
  };

export const AuthDavesaApiService = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);

  const token = signal<any | null>(null);
  const decodedToken = signal<any | null>(null);
  const orgDomain = signal<any | null>(null);
  const user = signal<User | null>(null);
  const userDetails = signal<User | null>(null);
  const userRole = signal<any | null>(null);
  const userRoles = signal<any | null>(null);
  const userPermissions = signal<PermissionsObj | null>(null);
  const isLoggedIn = computed(() => !!user());

  const loading = signal(false);
  const error = signal<string | null>(null);

  
  const signIn = (credentials: any) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post<any>('auth/signin', credentials, httpOptions).pipe(
      tap({
        next: (res: any) => {
          token.set(res.data.accessToken)
          decodedToken.set(jwt_decode(token()))
          user.set(res.data);
          userRole.set(res?.data?.user_role?.name)
          const authToken ={ oid: decodedToken().oid, token: res.data.accessToken};
        
          const userDetailsVar = getById();
          const role = userDetails()?.user_role?.role?.name;
          if (
            role === UserRoleEnum.admin ||
            role === UserRoleEnum.siteManager
          ) {
            const userpermissions = {
              isEdit: true,
              isDelete: true,
              isView: true,
              isCreate: true,
              isAccessAllowed: true,
            }
            userPermissions.set(userpermissions)
          } else {
            userPermissions.set(null)
          }
  
          setToStorage()
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const getById = () => {
    loading.set(true);
    error.set(null);  
    return _httpClient.get<User>('user/' + decodedToken().oid, httpOptions).pipe(
      tap({
        next: (res: any) => {
          user.set(res.data)
          userDetails.set(res.data)
          loading.set(false);
          return userDetails()
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const orgSignIn = (credentials: any) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post<any>('auth/org-signin/', credentials, httpOptions).pipe(
      tap({
        next: (res: any) => {
          token.set(res.data.accessToken)
          decodedToken.set(jwt_decode(token()))
          user.set(res.data);
          userRole.set(res?.data?.user_role?.name)
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      // encryptStorage.setItem('key', JSON.stringfy({ name: 'John Doe' }));
      const jsonorgDomain = encryptStorage.getItem(ORG_DOMAIN);
      orgDomain.set(jsonorgDomain)
      const jsonUser = encryptStorage.getItem(USER);
      user.set(jsonUser)
      const jsonToken = encryptStorage.getItem(TOKEN_KEY);
      token.set(jsonToken)
      const jsonDecodedToken = encryptStorage.getItem(DECODED_TOKEN_KEY);
      decodedToken.set(jsonDecodedToken)
      const jsonUserRole = encryptStorage.getItem(USER_ROLE);
      userRole.set(jsonUserRole)

    } catch(err: any) {
      error.set(err)
      console.error('Error loading user from storage:', err);
    }
    loading.set(false);

  }

  const setToStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      encryptStorage.setItem(ORG_DOMAIN, JSON.stringify(orgDomain()));
      encryptStorage.setItem(USER, JSON.stringify(user()));
      encryptStorage.setItem(TOKEN_KEY, JSON.stringify(token()));
      encryptStorage.setItem(DECODED_TOKEN_KEY, JSON.stringify(decodedToken()));
      encryptStorage.setItem(USER_ROLE, JSON.stringify(userRole()));
    } catch(err: any) {
      error.set(err)
      console.error('Error setting user to storage:', err);
    }
    loading.set(false);

  }

  const removeFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      encryptStorage.removeItem(ORG_DOMAIN);
      encryptStorage.removeItem(USER);
      encryptStorage.removeItem(TOKEN_KEY);
      encryptStorage.removeItem(DECODED_TOKEN_KEY);
      encryptStorage.removeItem(USER_ROLE);
      orgDomain.set(null)
      user.set(null)
      token.set(null)
      decodedToken.set(null)
      userRole.set(null)
    } catch(err: any) {
      error.set(err)
      console.error('Error removing user from storage:', err);
    }
    loading.set(false);
  }


  const signOut = () => {
    loading.set(true);
    error.set(null);  
    token.set(null)
    decodedToken.set(null)
    user.set(null)
    userRole.set(null)
    // _usersV2Service.removeFromStorage();
    removeFromStorage()
    loading.set(false);
  }

  const getOrgDomain = (data: string) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.get<GetOne<string>>('auth/verify-company-code/' + data, httpOptions).pipe(
      tap({
        next: (res: any) => {
          orgDomain.set(res.data)
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }
  
  const getUserDetails = (data: string) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.get<GetOne<User>>('auth/get-user-detail/' + data, httpOptions).pipe(
      tap({
        next: (res: GetOne<User>) => {
          user.set(res.data)
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }


  const googleAuthUrl = () => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post<GetOne<GoogleAuth>>('auth/create-auth-google-url', httpOptions).pipe(
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


  const getGoogleUserProfile = (data: { code: string; }) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post<GetOne<GoogleUserProfile>>('auth/get-profile-google', data, httpOptions).pipe(
      tap({
        next: (res: any) => {
          token.set(res.data.accessToken)
          decodedToken.set(jwt_decode(token()))
          user.set(res.data);
          userRole.set(res?.data?.user_role?.name)
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const forgetPasswordMail = (formData: any) => {
    loading.set(true);
    error.set(null);  

    return _httpClient.post<any>('auth/user-init-password-reset' + formData, httpOptions).pipe(
      tap({
        next: (res: any) => {
          token.set(res.data.accessToken)
          decodedToken.set(jwt_decode(token()))
          user.set(res.data);
          userRole.set(res?.data?.user_role?.name)
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const refreshAuthToken = (oldToken: string) => {
    loading.set(true);
    error.set(null);  
    return _httpClient.get<any>('auth/refresh-token/' + oldToken, httpOptions).pipe(
      tap({
        next: (res: any) => {
          token.set(res.data.token)
          decodedToken.set(jwt_decode(token()))
          // user.set(res.data);
          userRole.set(res?.data?.user_role?.name)
          const authToken ={ oid: decodedToken().oid, token: res.data.accessToken};
          setToStorage()
          loading.set(false);
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }


  const setOrgDomain = (domain: string) => {
    loading.set(true);
    error.set(null);  
    orgDomain.set(domain)
    loading.set(false);
  }

  const setUserRole = (roles: any) => {
    loading.set(true);
    error.set(null);  
    userRoles.set(roles)
    loading.set(false);
  }

  const removeToken = () => {
    loading.set(true);
    error.set(null);  
    token.set(null)
    decodedToken.set(null)
    loading.set(false);
  }

  const check = () => {
    loading.set(true);
    loadFromStorage(); 
    if(token() && user()) {
      loading.set(false);
      return true;
    } else {
      token.set(null)
      user.set(null)
      decodedToken.set(null)
      loading.set(false);
      return false;
    }
  }

  const getAuthUserAccessInfo = (): Observable<any> => {
    return new Observable((observer) => {
      try {
        loading.set(true);
        error.set(null);
  
        const role = userDetails()?.user_role?.role?.name;
        
        if (
          role === UserRoleEnum.admin ||
          role === UserRoleEnum.siteManager
        ) {
          const userpermissions = {
            isEdit: true,
            isDelete: true,
            isView: true,
            isCreate: true,
            isAccessAllowed: true,
          }
          userPermissions.set(userpermissions)
          observer.next(userpermissions);
        } else {
          observer.next(null);
        }
  
        // Ensure subscription ends properly after emitting value.
        observer.complete();
  
      } catch(err: any) {
        // Error propagation
        observer.error(err);
      }
    });
  }


  return {
    token: computed(() => token()),
    decodedToken: computed(() => decodedToken()),
    orgDomain: computed(() => orgDomain()),
    user: computed(() => user()),
    userDetails: computed(() => userDetails()),
    userRole: computed(() => userRole()),
    userPermissions: computed(() => userPermissions()),
    isLoggedIn: computed(() => isLoggedIn()),
    loading: computed(() => loading()),
    error: computed(() => error()),
    signIn,
    orgSignIn,
    getUserById: getById,
    signOut,
    getOrgDomain,
    getUserDetails,
    googleAuthUrl,
    getGoogleUserProfile,
    forgetPasswordMail,
    setOrgDomain,
    removeToken,
    refreshAuthToken,
    setUserRole,
    check,
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    getAuthUserAccessInfo
  };


});