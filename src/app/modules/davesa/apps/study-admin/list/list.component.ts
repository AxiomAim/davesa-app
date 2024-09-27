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
import { Study } from 'app/core/interfaces/study.interface';
import { StudyAdminService } from 'app/modules/davesa/apps/study-admin/study-admin.service';
import {
    Observable,
    Subject,
    filter,
    fromEvent,
    switchMap,
    takeUntil,
} from 'rxjs';

@Component({
    selector: 'study-admin-list',
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
        MatTooltipModule,

    ],
})
export class StudyAdminListComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    @ViewChild('studyList', {read: ElementRef}) studyList: ElementRef;
    studies$: Observable<Study[]>;
    allStudies$: Observable<Study[]>;
    studiesCount: number = 0;
    studiesTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    // countries: Country[];
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedStudy: Study;
    studies: Study[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    placeholderStudy: string = "Select Study";

    /**
     * Admin
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _studyAdminService: StudyAdminService,
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
        // Get the studies
        this.studies$ = this._studyAdminService.studies$;
        this.allStudies$ = this.studies$;
        this._studyAdminService.studies$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                {
                    next: (studies: Study[]) => {
                        if(studies) {
                            // Update the counts
                            this.studiesCount = studies.length;
                            const result = studies.reduce((r, a) => {
                                if (r.indexOf(a.id) === -1) r.push(a.id);
                                return r;
                              }, []);
                            this.studies = result;

                            // Mark for check
                            this._changeDetectorRef.markForCheck();

                        } 
                    },
                    error: (error) => {
                        console.error('Error getting studies:', error);
                    },
            });

        // Get the study
        this._studyAdminService.study$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((study: Study) => {
                if(study) {
                    // Update the selected study
                    this.selectedStudy = study;
                    this.scrollToItem(study.id);
                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                }
            });


        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) =>
                    // Search
                    this._studyAdminService.searchStudies(query)
                )
            )
            .subscribe();

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected study when drawer closed
                this.selectedStudy = null;

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
                this.createStudy();
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
     * Create study
     */
    createStudy(): void {
        const newStudy = this._studyAdminService.createStudy()
        newStudy
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((study: Study) => {
                console.log('study', study)
                if(study) {
                    this.selectedStudy = study;
                    this._router.navigate(['./', study.oid], {
                        relativeTo: this._activatedRoute,
                    });
                    this._changeDetectorRef.markForCheck();
                    // this.matDrawer.open();
                }
            });


        // // Create the study
        // this._studyAdminService.createStudy().subscribe((newStudy) => {
        //     // Go to the new study
        //     this._router.navigate(['./', newStudy.id], {
        //         relativeTo: this._activatedRoute,
        //     });

        //     // Mark for check
        //     this._changeDetectorRef.markForCheck();
        // });
    }

    scrollToItem(id: number): void {
        console.log('scrollToItem', id)
        if(id) {
            this.studies$.subscribe((studies: Study[]) => {
                const index = studies.findIndex(
                    (item) => item.id === id
                );
                const itemElement = this.studyList.nativeElement.querySelector(`#item${index}`);
                if (itemElement) itemElement.scrollIntoView();    
            })
        }
    }

    resetSelectedStudy() {
        this.selectedStudy = null;
    }

    tableView() {
        this._router.navigate(["apps/study-admin/table"], {
            queryParams: {
            },
            preserveFragment: true,
            });
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

}
