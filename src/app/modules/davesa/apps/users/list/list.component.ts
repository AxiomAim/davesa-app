import { AsyncPipe, DatePipe, DOCUMENT, I18nPluralPipe, NgClass, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    ActivatedRoute,
    Router,
    RouterLink,
    RouterOutlet,
} from '@angular/router';
import { DavesaMediaWatcherService } from '@davesa/services/media-watcher';
import { GridAllModule, GridComponent, TextWrapSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { User } from 'app/core/interfaces/user.interface';
import { SearchFilterComponent } from 'app/layout/common/search-filter/search-filter.component';
import { SearchComponent } from 'app/layout/common/search/search.component';
import { UsersService } from 'app/modules/davesa/apps/users/users.service';
import {
    Observable,
    Subject,
    filter,
    fromEvent,
    switchMap,
    takeUntil,
} from 'rxjs';

@Component({
    selector: 'users-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatSidenavModule,
        RouterOutlet,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        NgClass,
        NgIf,
        RouterLink,
        AsyncPipe,
        I18nPluralPipe,
        MatTooltipModule,
        GridAllModule,
        DatePipe
        
    ],
})
export class UsersListComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    @ViewChild('itemdGrid') public itemdGrid: GridComponent;
    public filters = { status: 'All', condition: 'All', other: 'All' };
    public pageSettings?: Object;
    public wrapSettings: TextWrapSettingsModel;
    public toolbar: ToolbarItems[] = ['Search'];
    public sortOptions: object;
  
    users$: Observable<User[]>;
    allUsers$: Observable<User[]>;

    usersCount: number = 0;
    usersTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedUser: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    viewTable: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _usersService: UsersService,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _davesaMediaWatcherService: DavesaMediaWatcherService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.pageSettings = { pageSizes: ['5', '10','15','20', 'All'], };
        // Get the users
        this.users$ = this._usersService.users$;
        this._usersService.users$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                {
                    next: 
                    (users: User[]) => {
                        // Update the counts
                        this.usersCount = users.length;
        
                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    },
                    error: (err) => {
                        // Show the error
                        console.error(err);
                    },
                }
            );

        // Get the user
        this._usersService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                // Update the selected user
                this.selectedUser = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) => {
                    // Search
                    return this._usersService.search(query)
                }
                )
            )
            .subscribe();

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected user when drawer closed
                this.selectedUser = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

        // Subscribe to media changes
        this._davesaMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                } else {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Listen for shortcuts
        fromEvent(this._document, 'keydown')
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter<KeyboardEvent>(
                    (event) =>
                        (event.ctrlKey === true || event.metaKey) && // Ctrl or Cmd
                        event.key === '/' // '/'
                )
            )
            .subscribe(() => {
                this.createUser();
            });
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
     * On backdrop clicked
     */
    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Create user
     */
    createUser(): void {
        // Create the user
        this._usersService.createUser().subscribe((newUser) => {
            // Go to the new user
            this._router.navigate(['./', newUser.oid], {
                relativeTo: this._activatedRoute,
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    clearSearch() {
        this.users$ = this._usersService.allUsers$;
        this._usersService.allUsers$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((users: User[]) => {
            // Update the counts
            this.usersCount = users.length;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });

        this.searchInputControl.reset();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.oid || index;
    }

    selectedRow(event: any) {
        this._router.navigate(['apps/users/', event.data.oid])
    }

}
