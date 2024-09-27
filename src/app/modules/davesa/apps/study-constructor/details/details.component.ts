import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
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
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawer, MatDrawerToggleResult, MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DavesaFindByKeyPipe } from '@davesa/pipes/find-by-key/find-by-key.pipe';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
import { StudyConstructorService } from 'app/modules/davesa/apps/study-constructor/study-constructor.service';
import { StudyConstructorListComponent } from 'app/modules/davesa/apps/study-constructor/list/list.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { AgePipe } from '@davesa/pipes/age.pipe';
import { DavesaECommunicationService } from '../e-communication';
import { CommunicationsSidebarComponent } from '../communications/sidebar/sidebar.component';
import { Study } from 'app/core/interfaces/study.interface';

@Component({
    selector: 'study-constructor-details',
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
        CommunicationsSidebarComponent
    ],
})
export class StudyConstructorDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('commDrawer') commDrawer: MatDrawer;

    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;

    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    studyImgSrc: string; 
    editMode: boolean = false;
    // tags: Tag[];
    tagsEditMode: boolean = false;
    // filteredTags: Tag[];
    study: Study;
    studyForm: UntypedFormGroup;
    studies: Study[];
    // countries: Country[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _studyConstructorListComponent: StudyConstructorListComponent,
        private _studyConstructorService: StudyConstructorService,
        private _formBuilder: UntypedFormBuilder,
        private _davesaConfirmationService: DavesaConfirmationService,
        private _davesaECommunicationService: DavesaECommunicationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Open the drawer
        this._studyConstructorListComponent.matDrawer.open();


        // Get the studies
        this._studyConstructorService.studies$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((studies: any) => {
                this.studies = studies;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the study
        this._studyConstructorService.study$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((study: any) => {
                console.log('details', study)
                if(study) {
                    if(study.oid === '00000000-0000-0000-0000-000000000000') {
                        this.editMode = true;
                        // Create the study form
                        this.initStudyFormGroup(study)

                    }
                    // Open the drawer in case it is closed
                    this._studyConstructorListComponent.matDrawer.open();

                    // Get the study
                    this.study = study;
                    console.log('onInit', study)

                    // Patch values to the form
                    this.studyForm.patchValue(study);


                    // Toggle the edit mode off
                    this.toggleEditMode(false);

                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                } else {
                    console.log('no study')
                }
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
    }

    initStudyFormGroup(study: Study) {
        this.studyForm = this._formBuilder.group({
          oid: [study.oid],
          name: [null, Validators.required],
          nick_name: [null],
          number: [null, Validators.required],
          site_account_id: [null],
          interval: [, Validators.required],
          schedule_type: ["", Validators.required],
          cro_id: [null],
          irb_id: [null],
          sponsor_id: [null, Validators.required],
          indication: [null],
          site_number: [""],
          isf_type: ["pre-populate"],
          isf_repository: ["", Validators.required],
          study_type: [null, Validators.required],
          study_phase: [null, Validators.required],
          study_timeline: [null],
          external_edc: [false, Validators.required],
          is_finance: [false, Validators.required],
          study_email_id: [null],
          target_enrollment: [null],
        });
      }
    
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._studyConstructorListComponent.matDrawer.close();
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
     * Update the study
     */
    updateStudy(): void {
        // Get the study object
        const study = this.studyForm.getRawValue();

        // Go through the study object and clear empty values
        study.emails = study.emails.filter((email) => email.email);
        console.log('study', study)

        // Update the study on the server
        this._studyConstructorService
            .updateStudy(study.id, study)
            .subscribe(() => {
                // Toggle the edit mode off
                this.toggleEditMode(false);
            });
    }

    /**
     * Delete the study
     */
    deleteStudy(study: Study): void {
        // Open the confirmation dialog
        const confirmation = this._davesaConfirmationService.open({
            title: 'Delete study',
            message:
                'Are you sure you want to delete this study? This action cannot be undone!',
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
                // Get the current study's id
                const id = study.id;

                // Get the next/previous study's id
                const currentStudyIndex = this.studies.findIndex(
                    (item) => item.id === id
                );
                const nextStudyIndex =
                    currentStudyIndex +
                    (currentStudyIndex === this.studies.length - 1 ? -1 : 1);
                const nextStudyId =
                    this.studies.length === 1 && this.studies[0].id === id
                        ? null
                        : this.studies[nextStudyIndex].id;

                // Delete the study
                this._studyConstructorService
                    .deleteStudy(study.oid)
                    .subscribe((isDeleted) => {
                        // Return if the study wasn't deleted...
                        if (!isDeleted) {
                            return;
                        }

                        // Navigate to the next study if available
                        if (nextStudyId) {
                            this._router.navigate(['../', nextStudyId], {
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


    /**
     * Add an empty phone number field
     */
    addPhoneNumberField(): void {
        // Create an empty phone number form group
        const phoneNumberFormGroup = this._formBuilder.group({
            country: ['us'],
            phoneNumber: [''],
            label: [''],
        });

        // Add the phone number form group to the phoneNumbers form array
        (this.studyForm.get('phoneNumbers') as UntypedFormArray).push(
            phoneNumberFormGroup
        );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the phone number field
     *
     * @param index
     */
    removePhoneNumberField(index: number): void {
        // Get form array for phone numbers
        const phoneNumbersFormArray = this.studyForm.get(
            'phoneNumbers'
        ) as UntypedFormArray;

        // Remove the phone number field
        phoneNumbersFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
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
        this._router.navigate(["apps/studies/communications"], {
            queryParams: {
            //   study_oid: subject.study_oid,
            //   subject_oid: subject.subject_oid,
            },
            preserveFragment: true,
          });

        // const communication = this._davesaECommunicationService.open({
        //     title: 'New Communication',
        //     message: 'This will send a communication to this study',
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
    eCommunicationHistory(study: any) {
        this._router.navigate(["studies/communications"], {
            queryParams: {
            //   study_oid: subject.study_oid,
            //   subject_oid: subject.subject_oid,
            },
            preserveFragment: true,
          });
      
    }

    // visitConsole() {
    //     this._studyConstructorService.getSubjectById(this.study.oid).subscribe((study: any) => {
    //             if(study) {
    //                 console.log('visitConsole', study.data);
    //                 this._router.navigate(["apps/studies/visit-console"], {
    //                     queryParams: {
    //                         id: study.id,
    //                         oid: study.oid,
    //                     },
    //                     preserveFragment: true,
    //                   });

    //             } else {
    //                 console.log('visitConsole:No');
    //             }
    //         }
    //     );
      
    // }

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
