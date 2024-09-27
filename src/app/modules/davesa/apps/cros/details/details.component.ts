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
import { CrosService } from 'app/modules/davesa/apps/cros/cros.service';
import {
    Cro,
} from 'app/modules/davesa/apps/cros/cros.types';
import { CrosListComponent } from 'app/modules/davesa/apps/cros/list/list.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
    selector: 'cros-details',
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
export class CrosDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    studyImgSrc: string; 
    editMode: boolean = false;
    tagsEditMode: boolean = false;
    cro: Cro;
    croForm: UntypedFormGroup;
    cros: Cro[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _crosListComponent: CrosListComponent,
        private _crosService: CrosService,
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
        this._crosListComponent.matDrawer.open();

        // Create the cro form
        this.croForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            website: [''],
            email: [''],
            phone_phone: [''],
            address: [''],
            type: [''],
        });

        // Get the cros
        this._crosService.cros$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cros: Cro[]) => {
                this.cros = cros;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the cro
        this._crosService.cro$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cro: Cro) => {
                // Open the drawer in case it is closed
                this._crosListComponent.matDrawer.open();

                // Get the cro
                this.cro = cro;

                // Clear the emails and phoneNumbers form arrays
                (this.croForm.get('emails') as UntypedFormArray).clear();
                (
                    this.croForm.get('phoneNumbers') as UntypedFormArray
                ).clear();

                // Patch values to the form
                this.croForm.patchValue(cro);

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
        return this._crosListComponent.matDrawer.close();
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
     * Update the cro
     */
    updateCro(): void {
        // Get the cro object
        const cro = this.croForm.getRawValue();

        // Go through the cro object and clear empty values
        cro.emails = cro.emails.filter((email) => email.email);

        cro.phoneNumbers = cro.phoneNumbers.filter(
            (phoneNumber) => phoneNumber.phoneNumber
        );

        // Update the cro on the server
        this._crosService
            .updateCro(cro.id, cro)
            .subscribe(() => {
                // Toggle the edit mode off
                this.toggleEditMode(false);
            });
    }

    /**
     * Delete the cro
     */
    deleteCro(): void {
        // Open the confirmation dialog
        const confirmation = this._davesaConfirmationService.open({
            title: 'Delete cro',
            message:
                'Are you sure you want to delete this cro? This action cannot be undone!',
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
                // Get the current cro's oid
                const oid = this.cro.oid;

                // Get the next/previous cro's oid
                const currentCroIndex = this.cros.findIndex(
                    (item) => item.oid === oid
                );
                const nextCroIndex =
                    currentCroIndex +
                    (currentCroIndex === this.cros.length - 1 ? -1 : 1);
                const nextCroId =
                    this.cros.length === 1 && this.cros[0].oid === oid
                        ? null
                        : this.cros[nextCroIndex].oid;

                // Delete the cro
                this._crosService
                    .deleteCro(oid)
                    .subscribe((isDeleted) => {
                        // Return if the cro wasn't deleted...
                        if (!isDeleted) {
                            return;
                        }

                        // Navigate to the next cro if available
                        if (nextCroId) {
                            this._router.navigate(['../', nextCroId], {
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
        (this.croForm.get('emails') as UntypedFormArray).push(
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
        const emailsFormArray = this.croForm.get(
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
        (this.croForm.get('phoneNumbers') as UntypedFormArray).push(
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
        const phoneNumbersFormArray = this.croForm.get(
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
