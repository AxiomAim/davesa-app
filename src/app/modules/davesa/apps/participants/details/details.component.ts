import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject,
    OnDestroy,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
    signal
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MatOptionModule, MatRippleModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawer, MatDrawerToggleResult, MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DavesaFindByKeyPipe } from '@davesa/pipes/find-by-key/find-by-key.pipe';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
import { ParticipantsService } from 'app/modules/davesa/apps/participants/participants.service';
import { ParticipantsListComponent } from 'app/modules/davesa/apps/participants/list/list.component';
import { Subject, debounceTime, takeUntil, startWith } from 'rxjs';
import { Participant } from 'app/core/interfaces/participant.interface';
import { AgePipe } from '@davesa/pipes/age.pipe';
import { DavesaECommunicationService } from '../e-communication';
import { CommunicationsSidebarComponent } from '../communications/sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { VisitsV2Service } from 'app/core/services/visits-v2.services';
import { Visit } from 'app/core/interfaces/visit.interface';
@Component({
    selector: 'participants-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButtonModule,
        MatTooltipModule,
        RouterLink,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        NgClass,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        TextFieldModule,
        DavesaFindByKeyPipe,
        DatePipe,
        AgePipe,
        MatSidenavModule,
        CommunicationsSidebarComponent,
    ],
    providers: [provideNativeDateAdapter()],

})
export class ParticipantsDetailsComponent implements OnInit, OnDestroy {
    private _destroyed = new Subject<void>();
  
    readonly periodLabel = signal('');
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;

    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    editMode: boolean = false;
    // tags: Tag[];
    tagsEditMode: boolean = false;
    // filteredTags: Tag[];
    participant: Participant;
    participantForm: UntypedFormGroup;
    participants: Participant[];
    visits: Visit[];
    visitStatus: any;
    // countries: Country[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _participantsListComponent: ParticipantsListComponent,
        private _participantsService: ParticipantsService,
        private _formBuilder: UntypedFormBuilder,
        private _davesaConfirmationService: DavesaConfirmationService,
        private _davesaECommunicationService: DavesaECommunicationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        
    ) {
        // this._calendar.stateChanges.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
        //     this.periodLabel.set(
        //       this._dateAdapter
        //         .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
        //         .toLocaleUpperCase(),
        //     );
        //   });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Open the drawer
        this._participantsListComponent.matDrawer.open();

        // Create the participant form
        this.participantForm = this._formBuilder.group({
            id: [''],
            avatar: [null],
            name: ['', [Validators.required]],
            email: [''],
            phoneNumbers: this._formBuilder.array([]),
            title: [''],
            company: [''],
            birthday: [null],
            address: [null],
            notes: [null],
        });

        this._participantsService.getVisitStatus();

        // Get the participants
        this._participantsService.participants$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((participants: Participant[]) => {
                this.participants = participants;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the participant
        this._participantsService.participant$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((participant: any) => {
                if(participant) {
                    // Open the drawer in case it is closed
                    this._participantsListComponent.matDrawer.open();

                    // Get the participant
                    this.participant = participant;
                    this._participantsService.setParticipant(participant);
                    // Patch values to the form
                    this.participantForm.patchValue(participant);


                    // Toggle the edit mode off
                    this.toggleEditMode(false);

                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                } else {
                    console.log('no participant')
                }
            });

            this._participantsService.visits$.subscribe((visits: any) => {
                this.visits = visits
            });

            this._participantsService.visitStatus$.subscribe((visitStatus: any) => {
                this.visitStatus = visitStatus
            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlays if they are still on the DOM
        if (this._tagsPanelOverlayRef) {
            this._tagsPanelOverlayRef.dispose();
        }

        this._destroyed.next();
        this._destroyed.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._participantsListComponent.matDrawer.close();
    }

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void {
        if (editMode === null) {
            this.editMode = !this.editMode;
        } else {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Update the participant
     */
    updateParticipant(): void {
        // Get the participant object
        const participant = this.participantForm.getRawValue();

        // Go through the participant object and clear empty values
        participant.emails = participant.emails.filter((email) => email.email);

        // Update the participant on the server
        this._participantsService
            .updateParticipant(participant.id, participant)
            .subscribe(() => {
                // Toggle the edit mode off
                this.toggleEditMode(false);
            });
    }

    /**
     * Delete the participant
     */
    deleteParticipant(): void {
        // Open the confirmation dialog
        const confirmation = this._davesaConfirmationService.open({
            title: 'Delete participant',
            message:
                'Are you sure you want to delete this participant? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Get the current participant's id
                const oid = this.participant.oid;

                // Get the next/previous participant's id
                const currentParticipantIndex = this.participants.findIndex(
                    (item) => item.oid === oid
                );
                const nextParticipantIndex =
                    currentParticipantIndex +
                    (currentParticipantIndex === this.participants.length - 1 ? -1 : 1);
                const nextParticipantId =
                    this.participants.length === 1 && this.participants[0].oid === oid
                        ? null
                        : this.participants[nextParticipantIndex].id;

                // Delete the participant
                this._participantsService
                    .deleteParticipant(oid)
                    .subscribe((isDeleted) => {
                        // Return if the participant wasn't deleted...
                        if (!isDeleted) {
                            return;
                        }

                        // Navigate to the next participant if available
                        if (nextParticipantId) {
                            this._router.navigate(['../', nextParticipantId], {
                                relativeTo: this._activatedRoute,
                            });
                        }
                        // Otherwise, navigate to the parent
                        else {
                            this._router.navigate(['../'], {
                                relativeTo: this._activatedRoute,
                            });
                        }

                        // Toggle the edit mode off
                        this.toggleEditMode(false);
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });
    }



    public getIcon(gender, age) {
        if(gender=='male' && age>=18) {
            return 'davesaicons_solid:man'
        }
        if(gender=='female' && age>=18) {
            return 'davesaicons_solid:woman'
        }
        if(gender=='male' && age<18) {
            return 'davesaicons_solid:boy'
        }
        if(gender=='female' && age<18) {
            return 'davesaicons_solid:girl'
        }
        
        return 'davesaicons_solid:person'
    }
    public getIconColor(gender: any) {
        switch(gender) {
            case 'female':
                return 'text-pink-500 icon-size-10'
            case'male':
                return 'text-blue-500 icon-size-10'
            default:
                return 'text-gray-500 icon-size-10'
        }

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

    openCommunication() {
        this.drawerOpened = true; return
    }
    communications() {
        this._router.navigate(["apps/participants/communications"], {
            queryParams: {
            //   study_oid: subject.study_oid,
            //   subject_oid: subject.subject_oid,
            },
            preserveFragment: true,
          });

        // const communication = this._davesaECommunicationService.open({
        //     title: 'New Communication',
        //     message: 'This will send a communication to this participant',
        //     icon: {
        //         show: true,
        //         name: "heroicons_solid:chat-bubble-bottom-center-text",
        //         color: "basic"
        //     },
        //     actions: {
        //         confirm: {
        //         show: true,
        //         label: "Send",
        //         color: "primary"
        //         },
        //         cancel: {
        //         show: true,
        //         label: "Cancel"
        //         }
        //     },
        //     dismissible: true
        // });
    }
    eCommunicationHistory(participant: any) {
        this._router.navigate(["participants/communications"], {
            queryParams: {
            //   study_oid: subject.study_oid,
            //   subject_oid: subject.subject_oid,
            },
            preserveFragment: true,
          });
      
    }

    openVisits() {        
        this._router.navigate(['apps/visits'], {
            // relativeTo: this._activatedRoute,
        });
      
    }

    /**
     * Get country info by iso code
     *
     * @param iso
     */
    // getCountryByIso(iso: string): Country {
    //     return this.countries.find((country) => country.iso === iso);
    // }

    toggleDrawerMode(): void {
        this.drawerMode = this.drawerMode === 'side' ? 'over' : 'side';
    }

    toggleDrawerOpen(): void {
        this.drawerOpened = !this.drawerOpened;
    }

    getVisitStatus(visit: any) {
        const index = this.visitStatus.findIndex(
            (item) => item.status === visit.status
        );
        const thisVisit = this.visitStatus[index];
        var thisClass = `${thisVisit.bgClass} ${thisVisit.textClassContrast}`
        return thisClass       
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
