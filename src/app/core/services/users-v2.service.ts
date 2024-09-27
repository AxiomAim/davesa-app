import { createInjectable } from 'ngxtension/create-injectable';
import { EncryptStorage } from 'encrypt-storage';
import { HttpClient, HttpContext, HttpHandler, HttpHeaders } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DAVESA_AUTH_API } from '../auth-davesa/auth-davesa-api.interceptor';
import { List } from '../interfaces/generics/list.interface';
import { FilterParams } from '../types/filter-params.type';
import { tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from 'environments/environment';
import { AuthDavesaApiService } from '../auth-davesa/auth-davesa-api.service';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});

const USERS = "users";
const ALL_USERS = "allUsers";

const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};

export const UsersV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _authDavesaApiService = inject(AuthDavesaApiService);
  const users = signal<User[] | null>(null);
  const allUsers = signal<User[] | null>(null);
  const user = signal<User | null>(null);

  const loading = signal(false);
  const error = signal<string | null>(null);


  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonusers = encryptStorage.getItem(USERS);
      users.set(jsonusers)
      const jsonallusers = encryptStorage.getItem(ALL_USERS);
      allUsers.set(jsonallusers)
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
      encryptStorage.setItem(USERS, JSON.stringify(users()));
      encryptStorage.setItem(ALL_USERS, JSON.stringify(allUsers()));
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
      encryptStorage.removeItem(USERS);
      encryptStorage.removeItem(ALL_USERS);
    } catch(err) {
      error.set(err)
      console.error('Error removing user from storage:', err);
    }
    loading.set(false);
  }

  const setUserDetails = (data) => {
    loading.set(true);
    error.set(null);  
    users.set(data)
    loading.set(false);
  }

  const setUser = (data) => {
    loading.set(true);
    error.set(null);  
    user.set(data)
    loading.set(false);
  }

  const getAll = (params?: FilterParams) => {

    loading.set(true);
    error.set(null);  
    return _httpClient.post<List<any>>('user', 
        params,
        httpOptions
    ).pipe(
      tap({
        next: (res: any) => {          
          if (res.data) {
            let rows = res.data
                .map(
                    (element: User) => {
                    let updatedElement = {...element};
                    updatedElement["name"] = updatedElement.first_name + ' ' + updatedElement.last_name;
                    updatedElement["userRoleName"] = updatedElement.user_roles.map(item => item?.role?.name).join(", ");
                    updatedElement["active"] = updatedElement.active === 1 ? "Yes" : "No";
                    return updatedElement;
                })
                .sort((a, b) => {
                    const lastNameComparison = a.last_name.localeCompare(b.last_name);
                    return lastNameComparison != 0 ? lastNameComparison : a.first_name.localeCompare(b.first_name);
                });
                console.log('rows', rows)
                users.set(rows)
                allUsers.set(rows)
                setToStorage();
                loading.set(false);
                return rows      
        }
        },
        error: (err) => {
          error.set(err);
          loading.set(false);
        },
      })
    );
  }

  const search = (query: string) => {
    loading.set(true);
    error.set(null);  

    if(query.length > 0) {
      // Filter the users
      let _allUsers = allUsers();
      console.log('query', query)
      try {
        if(_allUsers.length >0 ) {
          _allUsers = _allUsers.filter((user: any) =>
            user.name && user.name.toLowerCase().includes(query.toLowerCase())
          );
          _allUsers.sort((a:any, b:any) => a.name.localeCompare(b.name));        
          loading.set(false);
          return _allUsers;
        }
      } catch(err) {        
          getAll().subscribe(
            {
              next:
              (res: any) => {
                var resultsGetAll: any[] = res.data;
                console.log('resultsGetAll', resultsGetAll)
                const usersResults = resultsGetAll.filter(
                    (user) => user.first_name.toLowerCase().includes(query)
                );
                console.log('usersResults', usersResults)
                // usersResults.sort((a:any, b:any) => a.name.localeCompare(b.name));        
                // console.log('sorted', usersResults)
                loading.set(false);
                return usersResults;
                },
              error: (err) => {
                error.set(err);
                loading.set(false);
              }            
            }
          )  
        }
      }
    }      

  //     if(!_allUsers) {
  //       _allUsers = _allUsers.filter((user: any) =>
  //         user.name && user.name.toLowerCase().includes(query.toLowerCase())
  //       );
  //       _allUsers.sort((a:any, b:any) => a.name.localeCompare(b.name));        
  //       loading.set(false);
  //       return _allUsers;
  //   } else {
  //     loading.set(false);
  //     return allUsers()                
  //   }

  // }

    // search(query: string): Observable<User[]> {

  //   let currentUsers: User[] = this._allUsers.getValue();
  //   // If the query exists...
  //       if(query.length > 0) {
  //           // Filter the users
  //           let users = currentUsers.filter((user: any) =>
  //               user.name && user.name.toLowerCase().includes(query.toLowerCase())
  //           );
  //           users.sort((a:any, b:any) => a.name.localeCompare(b.name));
  //           // notify subscribers with new users list
  //           this._users.next(users);
            
  //           return of(users);
  //       } else {
  //               this._users.next(currentUsers);
  //               return of(currentUsers);                
  //       }
  //   }

  // const getAuthUserAccessInfo = () => {
  //   loading.set(true);
  //   error.set(null);  
  //   if (
  //     userDetails().role.name == UserRoleEnum.admin ||
  //     userDetails().role.name == UserRoleEnum.siteManager
  //   ) {
  //     userDetails().next({
  //       isEdit: true,
  //       isDelete: true,
  //       isView: true,
  //       isCreate: true,
  //       isAccessAllowed: true,
  //     });
  //     return userDetails()
  //   } else {
  //     return null;
  //   }
  // }


  // getAuthUserAccessInfo = () => {
  //   return new Observable((observer) => {
  //     this.getLogInUserDetails().subscribe((res) => {
  //       if (
  //         res.user_role?.role.name == UserRoleEnum.admin ||
  //         res.user_role?.role.name == UserRoleEnum.siteManager
  //       ) {
  //         observer.next({
  //           isEdit: true,
  //           isDelete: true,
  //           isView: true,
  //           isCreate: true,
  //           isAccessAllowed: true,
  //         });
  //       } else {
  //         observer.next(null);
  //       }
  //     });
  //   });
  // };

  // getAuthUserAccessInfoFormVisit = () => {
  //   return new Observable((observer) => {
  //     this.getLogInUserDetails().subscribe((res) => {
  //       if (
  //         res.user_role?.role.name == UserRoleEnum.admin ||
  //         res.user_role?.role.name == UserRoleEnum.siteManager
  //       ) {
  //         observer.next({
  //           isEdit: true,
  //           isDelete: true,
  //           isView: true,
  //           isCreate: true,
  //           isAccessAllowed: true,
  //         });
  //       } else {
  //         observer.next({ loginUser: res });
  //       }
  //     });
  //   });
  // };


  




  return {
    users: computed(() => users()),
    allUsers: computed(() => allUsers()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    setUserDetails,
    getAll,
    setUser,
    search



  };


});