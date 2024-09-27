import { AsyncPipe, DOCUMENT, I18nPluralPipe, NgClass } from '@angular/common';
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
import {
    ActivatedRoute,
    Router,
    RouterLink,
    RouterOutlet,
} from '@angular/router';
import { DavesaMediaWatcherService } from '@davesa/services/media-watcher';
import { SponsorsService } from 'app/modules/davesa/apps/sponsors/sponsors.service';
import {
    Sponsor,
} from 'app/modules/davesa/apps/sponsors/sponsors.types';
import {
    Observable,
    Subject,
    filter,
    fromEvent,
    switchMap,
    takeUntil,
} from 'rxjs';

@Component({
    selector: 'sponsors-list',
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
        RouterLink,
        AsyncPipe,
        I18nPluralPipe,
    ],
})
export class SponsorsListComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    sponsors$: Observable<Sponsor[]>;

    sponsorsCount: number = 0;
    sponsorsTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedSponsor: Sponsor;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _sponsorsService: SponsorsService,
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
        // Get the sponsors
        this.sponsors$ = this._sponsorsService.sponsors$;
        this._sponsorsService.sponsors$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((sponsors: Sponsor[]) => {
                // Update the counts
                this.sponsorsCount = sponsors.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the sponsor
        this._sponsorsService.sponsor$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((sponsor: Sponsor) => {
                // Update the selected sponsor
                this.selectedSponsor = sponsor;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) =>
                    // Search
                    this._sponsorsService.searchSponsors(query)
                )
            )
            .subscribe();

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected sponsor when drawer closed
                this.selectedSponsor = null;

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
                this.createSponsor();
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
     * Create sponsor
     */
    createSponsor(): void {
        // Create the sponsor
        this._sponsorsService.createSponsor().subscribe((newSponsor) => {
            // Go to the new sponsor
            this._router.navigate(['./', newSponsor.oid], {
                relativeTo: this._activatedRoute,
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
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
}
