import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EntityDataEnum } from 'app/core/enum/entity-data.enum';
import { EntityData } from 'app/core/interfaces/entity-data.interface';
import { Page } from 'app/core/interfaces/page.model';
import { SiteAccount } from 'app/core/interfaces/site-account.interface';
import { User } from 'app/core/interfaces/user.interface';
import { CredentialV2Service } from 'app/core/services/credential-v2.service';
import { EntityDataV2Service } from 'app/core/services/entity-data-v2.service';
import { SiteAccountV2Service } from 'app/core/services/site-account-v2.service';
import { UsersV2Service } from 'app/core/services/users-v2.service';
import { FilterParams } from 'app/core/types/filter-params.type';
import { cloneDeep, List } from 'lodash';
import {
    BehaviorSubject,
    Observable,
    Subscription,
    filter,
    map,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private _usersV2Service = inject(UsersV2Service);
    private _entityDataV2Service = inject(EntityDataV2Service);
    private _siteAccountV2Service = inject(SiteAccountV2Service);
    private _credentialV2Service = inject(CredentialV2Service);
    
    //EntityData Variables
    entityDataSubscription: Subscription;
    prefixNamesArray = [];
    countryCodes: EntityData[] = [];
    suffixArr: EntityData[] = [];
    credentialDropDownData: Credential[] = [];
    siteDropDownData: SiteAccount[] = [];

    
    public rows: User[];
    roleUser: string;
    page = new Page();
    user = new User;

    filterParamsData: FilterParams = {
        offset: 0,
        limit: 25,
        sort_field: "created_at",
        sort_direction: "D",
        query: "",
        site_account_id: null,
      };

      params: FilterParams = {
        offset: 0,
        limit: 0,
        sort_field: "",
        sort_direction: "",
        query: "",
      };
      paramsData: FilterParams = {
        offset: 0,
        limit: 10,
        sort_field: "",
        sort_direction: "",
        query: "",
        user_oid: "",
      };
    
    // Private
    private _user: BehaviorSubject<User | null> = new BehaviorSubject(
        null
    );
    private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(
        null
    );

    private _allUsers: BehaviorSubject<User[] | null> = new BehaviorSubject(
        null
    );

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for user
     */
    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    /**
     * Getter for users
     */
    get users$(): Observable<User[]> {
        return this._users.asObservable();
    }

    get allUsers$(): Observable<User[]> {
        return this._allUsers.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get users
     */
    getAll(): Observable<any[]> {
        return this._usersV2Service
        .getAll(this.filterParamsData)
        .pipe(tap((res: any) => {
            if (res.data) {
                this.rows = res.data
                    .map((element: User) => {
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
    
                    this._users.next(this.rows);
                    this._allUsers.next(this.rows);
    
                this.page.totalElements = res.unfilter_count;
                this.filterParamsData["pageOffset"] = this.filterParamsData.offset === 0 ? 0 : this.page.offset;
            }
        }));
    }
    
    /**
     * Search users with given query
     *
     * @param query
     */
    // search(query: string): Observable<User[]> {
    //     // Clone the users
    //     let users = cloneDeep(this._users);
    //     // If the query exists...
    //     if (query) {
    //         // Filter the contacts
    //         users = users.filter(
    //             (user) =>
    //                 user.name &&
    //                 user.name
    //                     .toLowerCase()
    //                     .includes(query.toLowerCase())
    //         );
    //     }
    //     // Sort the contacts by the name field by default
    //     users.sort((a, b) => a.name.localeCompare(b.name));
    //     this._users.next(users);
    // }

    search(query: string): Observable<User[]> {

        let currentUsers: User[] = this._allUsers.getValue();
        // If the query exists...
            if(query.length > 0) {
                // Filter the users
                let users = currentUsers.filter((user: any) =>
                    user.name && user.name.toLowerCase().includes(query.toLowerCase())
                );
                users.sort((a:any, b:any) => a.name.localeCompare(b.name));
                // notify subscribers with new users list
                this._users.next(users);
                
                return of(users);
            } else {
                    this._users.next(currentUsers);
                    return of(currentUsers);                
            }
        }
        /**
     * Get user by oid
     */
    getById(oid: string): Observable<User> {
        return this._users.pipe(
            take(1),
            map((users) => {
                // Find the user
                const user = users.find((item) => item.oid === oid) || null;
                this.user = user;
                // Update the user
                this.user = user;
                this._user.next(user);

                // Return the user
                return user;
            }),
            switchMap((user) => {
                if (!user) {
                    return throwError(
                        'Could not found user with oid of ' + oid + '!'
                    );
                }

                return of(user);
            })
        );
    }

    /**
     * Create user
     */
    createUser(): Observable<User> {
        return this.users$.pipe(
            take(1),
            switchMap((users) =>
                this._httpClient
                    .post<User>('api/apps/users/user', {})
                    .pipe(
                        map((newUser) => {
                            // Update the users with the new user
                            this._users.next([newUser, ...users]);

                            // Return the new user
                            return newUser;
                        })
                    )
            )
        );
    }

    /**
     * Update user
     *
     * @param oid
     * @param user
     */
    updateUser(oid: string, user: User): Observable<User> {
        return this.users$.pipe(
            take(1),
            switchMap((users) =>
                this._httpClient
                    .patch<User>('api/apps/users/user', {
                        oid,
                        user,
                    })
                    .pipe(
                        map((updatedUser) => {
                            // Find the index of the updated user
                            const index = users.findIndex(
                                (item) => item.oid === oid
                            );

                            // Update the user
                            users[index] = updatedUser;

                            // Update the users
                            this._users.next(users);

                            // Return the updated user
                            return updatedUser;
                        }),
                        switchMap((updatedUser) =>
                            this.user$.pipe(
                                take(1),
                                filter((item) => item && item.oid === oid),
                                tap(() => {
                                    // Update the user if it's selected
                                    this._user.next(updatedUser);

                                    // Return the updated user
                                    return updatedUser;
                                })
                            )
                        )
                    )
            )
        );
    }

    /**
     * Delete the user
     *
     * @param id
     */
    deleteUser(oid: string): Observable<boolean> {
        return this.users$.pipe(
            take(1),
            switchMap((users) =>
                this._httpClient
                    .delete('api/apps/users/user', { params: { oid } })
                    .pipe(
                        map((isDeleted: boolean) => {
                            // Find the index of the deleted user
                            const index = users.findIndex(
                                (item) => item.oid === oid
                            );

                            // Delete the user
                            users.splice(index, 1);

                            // Update the users
                            this._users.next(users);

                            // Return the deleted status
                            return isDeleted;
                        })
                    )
            )
        );
    }

    getEntityData() {
        this.entityDataSubscription = this._entityDataV2Service
          .getAll({
            offset: 0,
            limit: 0,
            sort_field: "created_at",
            sort_direction: "D",
            query: "",
          })
          .subscribe((response: List<EntityData>) => {
            response["data"].filter((element) => {
              if (element.entity.name === EntityDataEnum.PREFIX) {
                this.prefixNamesArray.push(element);
              } else if (element.entity.name === EntityDataEnum.COUNTRY_CODE) {
                this.countryCodes.push(element);
              } else if (element.entity.name === EntityDataEnum.SUFFIX) {
                this.suffixArr.push(element);
              }
            });
          });
    
        this.getSiteDropDownData();
      }
    
      getSiteDropDownData() {
        this._siteAccountV2Service
          .getAll(this.params)
          .subscribe((res: any) => {
            if (res) {
              res["data"].filter((element) => {
                if (element.is_active == true) {
                  this.siteDropDownData = res.data;
                }
              });
              if (this.user?.site_account_id != undefined) {
                var site_account = this.user.user_site_accounts.map((x) => {
                  return x.site_account_id;
                });
                // this.userFormGroup.controls.site_account_id.setValue(site_account);
              }
              this.getCredentialDropDownData();
            }
          });
      }
    
      getCredentialDropDownData() {
        this._credentialV2Service
          .getAll(this.params)
          .subscribe((res: any) => {
            this.credentialDropDownData = res.data;
            // if (this.userId) {
            //   this.getUserDetails();
            // } else {
            //   this.DelegationRoleList();
            // }
          });
      }
    
    
}
