import { AsyncPipe, DOCUMENT, I18nPluralPipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject,
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
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    ActivatedRoute,
    Router,
    RouterLink,
    RouterOutlet,
} from '@angular/router';
import { GroupByPipe } from '@davesa/pipes/group-by.pipe';
import { DavesaMediaWatcherService } from '@davesa/services/media-watcher';
import { DetailRowService, EditService, FilterService, GridComponent, GridModule, GroupService, PageService, SearchService, SelectionSettingsModel, SortService, TextWrapSettingsModel, ToolbarItems, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { Participant } from 'app/core/interfaces/participant.interface';
import { SearchFilterComponent } from 'app/layout/common/search-filter/search-filter.component';
import { ParticipantsService } from 'app/modules/davesa/apps/participants/participants.service';
import {
    Observable,
    Subject,
    filter,
    fromEvent,
    switchMap,
    takeUntil,
} from 'rxjs';


@Component({
    selector: 'participants-list',
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
        MatRippleModule,
        MatMenuModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        NgClass,
        RouterLink,
        AsyncPipe,
        I18nPluralPipe,
        GroupByPipe,
        GridModule,
        MatTooltipModule,
        SearchFilterComponent
    
        

    ],
    providers: [
        PageService,
        ToolbarService,
        EditService,
        SortService,
        FilterService,
        GroupService,
        SearchService,
        DetailRowService,
    ]

})
export class ParticipantsListComponent implements OnInit, OnDestroy {
    @ViewChild('participantsGrid') public participantsGrid: GridComponent;
    public filters = { status: 'All', condition: 'All', other: 'All' };
    public pageSettings?: Object;
    public wrapSettings: TextWrapSettingsModel;
    public toolbar: ToolbarItems[] = ['Search'];
    public sortOptions: object;
    permissionsObj: any;

    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    @ViewChild('participantList', {read: ElementRef}) participantList: ElementRef;
    participants$: Observable<Participant[]>;
    allParticipants$: Observable<Participant[]>;
    participantsCount: number = 0;
    participantsTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    // countries: Country[];
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedParticipant: Participant;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    placeholderStudy: string = "Select Study";
    selectedStudy: string;
    studies: string[];
    viewTable: boolean = false;


    public data?: object[];

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _participantsService: ParticipantsService,
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
        this.toolbar = ['Search'];
        

        this.wrapSettings = { wrapMode: 'Both' };
        this.pageSettings = { pageSizes: ['5', '10','15','20', 'All'], };

        this.sortOptions = { columns: [{ field: 'sort', direction: 'Ascending' }] };

        
        // Get the participants
        this.participants$ = this._participantsService.participants$;
        this.allParticipants$ = this.participants$;
        this._participantsService.participants$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                {
                    next: (participants: Participant[]) => {
                        if(participants) {
                            // Update the counts
                            this.participantsCount = participants.length;
                            const result = participants.reduce((r, a) => {
                                if (r.indexOf(a.study_number) === -1) r.push(a.study_number);
                                return r;
                              }, []);
                            this.studies = result;
                            // Mark for check
                            this._changeDetectorRef.markForCheck();

                        } 
                    },
                    error: (error) => {
                        console.error('Error getting participants:', error);
                    },
            });

        // Get the participant
        this._participantsService.participant$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((participant: Participant) => {
                // Update the selected participant
                if(participant) {
                    this.selectedParticipant = participant;
                    this.scrollToItem(participant.oid);
    
                }
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) =>
                    // Search
                    this._participantsService.search(query)
                )
            )
            .subscribe();

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected participant when drawer closed
                this.selectedParticipant = null;

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
                this.createParticipant();
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
     * Create participant
     */
    createParticipant(): void {
        // Create the participant
        this._participantsService.createParticipant().subscribe((newParticipant) => {
            // Go to the new participant
            this._router.navigate(['./', newParticipant.id], {
                relativeTo: this._activatedRoute,
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    scrollToItem(oid: string): void {
        // if(oid) {
        //     this.participants$.subscribe((participants: Participant[]) => {
        //         const index = participants.findIndex(
        //             (item) => item.oid === oid
        //         );
        //         const itemElement = this.participantList.nativeElement.querySelector(`#item${index}`);
        //         if (itemElement) itemElement.scrollIntoView();    
        //     })
        // }
    }

    resetSelectedStudy() {
        this.selectedStudy = null;
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    selectedRow(event: any) {
        this._router.navigate(['apps/participants/', event.data.oid])
    }
}
