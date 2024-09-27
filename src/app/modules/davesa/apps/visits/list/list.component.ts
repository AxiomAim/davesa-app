import { AsyncPipe, DatePipe, DOCUMENT, I18nPluralPipe, NgClass } from '@angular/common';
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
import { Visit } from 'app/core/interfaces/visit.interface';
import {
    Observable,
    Subject,
    filter,
    fromEvent,
    switchMap,
    takeUntil,
} from 'rxjs';
import { VisitsService } from '../visits.service';
import { Participant } from 'app/core/interfaces/participant.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AgePipe } from '@davesa/pipes/age.pipe';

@Component({
    selector: 'participants-visits-list',
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
        MatTooltipModule,
        DatePipe,
        AgePipe,
    ],
})
export class VisitsListComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    participant: Participant;
    visits$: Observable<Visit[]>;

    visitsCount: number = 0;
    visitsTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedVisit: Visit;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    visitStatus: any;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _visitsService: VisitsService,
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
        // Get the visits
        this._visitsService.participant$.subscribe(data => {
            this.participant = data;
        })

        this._visitsService.visitStatus$.subscribe((visitStatus: any) => {
            this.visitStatus = visitStatus
        });

        this.visits$ = this._visitsService.visits$;
        this._visitsService.visits$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((visits: Visit[]) => {
                // Update the counts
                this.visitsCount = visits.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the visit
        this._visitsService.visit$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((visit: Visit) => {
                // Update the selected visit
                this.selectedVisit = visit;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) =>
                    // Search
                    this._visitsService.searchVisits(query)
                )
            )
            .subscribe();

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected visit when drawer closed
                this.selectedVisit = null;

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
                this.createVisit();
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
     * Create visit
     */
    createVisit(): void {
        // Create the visit
        this._visitsService.createVisit().subscribe((newVisit) => {
            // Go to the new visit
            this._router.navigate(['./', newVisit.oid], {
                relativeTo: this._activatedRoute,
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    getVisitStatus(visit: any) {
        const index = this.visitStatus.findIndex(
            (item) => item.status === visit.status
        );
        const thisVisit = this.visitStatus[index];
        var thisClass = `${thisVisit.bgClass} ${thisVisit.textClassContrast}`
        return thisVisit       
      }
      
      public getAgeColor(gender: any) {
        switch(gender) {
            case 'female':
                return 'bg-pink-500 text-white'
            case'male':
                return 'bg-blue-500 text-white text-2xl'
            default:
                return 'bg-gray-500 text-gray-800 icon-size-7'
        }

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
