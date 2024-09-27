import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
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
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DavesaFindByKeyPipe } from '@davesa/pipes/find-by-key/find-by-key.pipe';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
import { SponsorsService } from 'app/modules/davesa/apps/sponsors/sponsors.service';
import {
    Sponsor,
} from 'app/modules/davesa/apps/sponsors/sponsors.types';
import { SponsorsListComponent } from 'app/modules/davesa/apps/sponsors/list/list.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
    selector: 'sponsors-details',
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
    ],
})
export class SponsorsDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    studyImgSrc: string; 
    editMode: boolean = false;
    tagsEditMode: boolean = false;
    sponsor: Sponsor;
    sponsorForm: UntypedFormGroup;
    sponsors: Sponsor[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _sponsorsListComponent: SponsorsListComponent,
        private _sponsorsService: SponsorsService,
        private _formBuilder: UntypedFormBuilder,
        private _davesaConfirmationService: DavesaConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Open the drawer
        this._sponsorsListComponent.matDrawer.open();

        // Create the sponsor form
        this.sponsorForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            website: [''],
            email: [''],
            phone_phone: [''],
            address: [''],
            type: [''],
        });

        // Get the sponsors
        this._sponsorsService.sponsors$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((sponsors: Sponsor[]) => {
                this.sponsors = sponsors;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the sponsor
        this._sponsorsService.sponsor$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((sponsor: Sponsor) => {
                // Open the drawer in case it is closed
                this._sponsorsListComponent.matDrawer.open();

                // Get the sponsor
                this.sponsor = sponsor;

                // Clear the emails and phoneNumbers form arrays
                (this.sponsorForm.get('emails') as UntypedFormArray).clear();
                (
                    this.sponsorForm.get('phoneNumbers') as UntypedFormArray
                ).clear();

                // Patch values to the form
                this.sponsorForm.patchValue(sponsor);

                // Toggle the edit mode off
                this.toggleEditMode(false);

                // Mark for check
                this._changeDetectorRef.markForCheck();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._sponsorsListComponent.matDrawer.close();
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
     * Update the sponsor
     */
    updateSponsor(): void {
        // Get the sponsor object
        const sponsor = this.sponsorForm.getRawValue();

        // Go through the sponsor object and clear empty values
        sponsor.emails = sponsor.emails.filter((email) => email.email);

        sponsor.phoneNumbers = sponsor.phoneNumbers.filter(
            (phoneNumber) => phoneNumber.phoneNumber
        );

        // Update the sponsor on the server
        this._sponsorsService
            .updateSponsor(sponsor.id, sponsor)
            .subscribe(() => {
                // Toggle the edit mode off
                this.toggleEditMode(false);
            });
    }

    /**
     * Delete the sponsor
     */
    deleteSponsor(): void {
        // Open the confirmation dialog
        const confirmation = this._davesaConfirmationService.open({
            title: 'Delete sponsor',
            message:
                'Are you sure you want to delete this sponsor? This action cannot be undone!',
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
                // Get the current sponsor's oid
                const oid = this.sponsor.oid;

                // Get the next/previous sponsor's oid
                const currentSponsorIndex = this.sponsors.findIndex(
                    (item) => item.oid === oid
                );
                const nextSponsorIndex =
                    currentSponsorIndex +
                    (currentSponsorIndex === this.sponsors.length - 1 ? -1 : 1);
                const nextSponsorId =
                    this.sponsors.length === 1 && this.sponsors[0].oid === oid
                        ? null
                        : this.sponsors[nextSponsorIndex].oid;

                // Delete the sponsor
                this._sponsorsService
                    .deleteSponsor(oid)
                    .subscribe((isDeleted) => {
                        // Return if the sponsor wasn't deleted...
                        if (!isDeleted) {
                            return;
                        }

                        // Navigate to the next sponsor if available
                        if (nextSponsorId) {
                            this._router.navigate(['../', nextSponsorId], {
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
     * Add the email field
     */
    addEmailField(): void {
        // Create an empty email form group
        const emailFormGroup = this._formBuilder.group({
            email: [''],
            label: [''],
        });

        // Add the email form group to the emails form array
        (this.sponsorForm.get('emails') as UntypedFormArray).push(
            emailFormGroup
        );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the email field
     *
     * @param index
     */
    removeEmailField(index: number): void {
        // Get form array for emails
        const emailsFormArray = this.sponsorForm.get(
            'emails'
        ) as UntypedFormArray;

        // Remove the email field
        emailsFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
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
        (this.sponsorForm.get('phoneNumbers') as UntypedFormArray).push(
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
        const phoneNumbersFormArray = this.sponsorForm.get(
            'phoneNumbers'
        ) as UntypedFormArray;

        // Remove the phone number field
        phoneNumbersFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
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
