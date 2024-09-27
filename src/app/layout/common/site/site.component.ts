import { BooleanInput } from '@angular/cdk/coercion';
import { AsyncPipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnDestroy,
    OnInit,
    signal,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { SafeHtmlPipe } from '@davesa/pipes/safehtml.pipe';
import { DavesaConfigService, Scheme } from '@davesa/services/config';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
 import { AuthDavesaApiService } from 'app/core/auth-davesa/auth-davesa-api.service';
import { SiteAccount } from 'app/core/interfaces/site-account.interface';
import { User } from 'app/core/interfaces/user.interface';
import { SiteAccountV2Service } from 'app/core/services/site-account-v2.service';
import { FilterParams } from 'app/core/types/filter-params.type';
import { BehaviorSubject, Observable, pipe, Subject, switchMap, tap } from 'rxjs';

@Component({
    selector: 'site',
    templateUrl: './site.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
    standalone: true,
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        NgClass,
        MatDividerModule,
        AsyncPipe
    ],
    providers: [
        SafeHtmlPipe
    ],
})
export class SiteComponent implements OnInit, OnDestroy {
    filterParamsData: FilterParams = {
        offset: 0,
        limit: 25,
        sort_field: "created_at",
        sort_direction: "D",
        query: "",
      };
    
    _authDavesaApiService = inject(AuthDavesaApiService);
    _siteAccountV2Service = inject(SiteAccountV2Service);
    public user: User;
    public userDetais: any;
    placeholderSite: string = "Select Site";
    selectedSite: string;

    private _sites: BehaviorSubject<SiteAccount[] | null> = new BehaviorSubject(
        null
    );

    get sites$(): Observable<SiteAccount[]> {
        return this._sites.asObservable();
    }

    public imageUrl: string;

    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _davesaConfigService: DavesaConfigService,
        private _davesaConfirmationService: DavesaConfirmationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // // Subscribe to user changes
        this.user = this._authDavesaApiService.user();
        this._authDavesaApiService.getUserById().pipe(tap((res: any) => {
            if(res) {
                this.userDetais = res.data;
                if(this.userDetais.user_role.role.name === 'admin') {
                    this.getAll()
                } else {
                    this._sites.next(this.userDetais.user_aite_accounts)
                }

            }
            
        }));

    }

    getAll() {
        this._siteAccountV2Service.getAll(this.filterParamsData).pipe(tap((res: any) => {
            if(res) {
                this._sites.next(res.data)
            }
        }))
    }

    resetSelectedStudy() {
        this.selectedSite = null;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void {
        // Return if user is not available
        if (!this.user) {
            return;
        }

        // this._usersService.updateUser(this.user).subscribe((res: Update<object>) => {
        //     if (res) {
        //         this._usersService.changeProfileDetails$.next(true);
        //         this._usersService.userSubject$.next(true);
        //         // this._snackbarService.success(res?.message);
        //     }
        //   });

          
        // Update the user
        // this._usersService
        //     .updateUser({
        //         ...this.user,
        //         status,
        //     })
        //     .subscribe();
    }

    /**
     * Sign out
     */
    async signOut() {
        this._authDavesaApiService.signOut();
        this._router.navigate(['/sign-out']);
    }

    settings() {
        this._router.navigateByUrl("/pages/settings");
    }
    profile() {
        this._router.navigateByUrl("/pages/profile");
    }

    loginHome() {
        this._router.navigate(['/login-home']);
    }

        /**
     * Set the scheme on the config
     *
     * @param scheme
     */
        setScheme(scheme: Scheme): void {
            this._davesaConfigService.config = { scheme };
        }
    
        // <div innerHtml='${this._authDavesaSignalService.user()} | safeHtml'></div>                    


        viewTokenDetails() {
            const config = {
                title: 'User Details',
                message:
                    `
                        <div>isLoggedIn: ${this._authDavesaApiService.isLoggedIn()}</div>
                        <div>token: ${this._authDavesaApiService.token()}</div>
                    `,
                icon: {
                    show: true,
                    name: 'heroicons_outline:davesa-c',
                    color: '',
                },
                actions: {
                    confirm: {
                        show: true,
                        label: 'Close',
                        color: 'primary',
                    },
                    cancel: {
                        show: false,
                        label: 'Cancel',
                    },
                },
                dismissible: true,
    
            };
            this.openConfirmationDialog(config);
        }

        viewUserDetails() {
            const user: any = this._authDavesaApiService.user();
            const config = {
                title: 'User Details',
                message:
                    `
                        <div>'${user.data.oid}'</div>
                        <div>'${user.data.first_name} ${user.data.last_name}'</div>
                        <div>'${user.data.email}'</div>
                    `,
                    icon: {
                        show: true,
                        name: 'heroicons_outline:davesa-c',
                        color: '',
                    },
                    actions: {
                        confirm: {
                            show: true,
                            label: 'Close',
                            color: 'primary',
                        },
                        cancel: {
                            show: false,
                            label: 'Cancel',
                        },
                    },
                    dismissible: true,        
            };
            this.openConfirmationDialog(config);
        }

        openConfirmationDialog(config): void {
            // Open the dialog and save the reference of it
            const dialogRef = this._davesaConfirmationService.open(
                config
            );
    
            // Subscribe to afterClosed from the dialog reference
            dialogRef.afterClosed().subscribe((result) => {
                console.log(result);
            });
        }
    
}
