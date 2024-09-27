import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    DatePipe,
    DecimalPipe,
    NgClass,
    NgPlural,
    NgPluralCase,
} from '@angular/common';
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DavesaScrollResetDirective } from '@davesa/directives/scroll-reset';
import { DavesaFindByKeyPipe } from '@davesa/pipes/find-by-key/find-by-key.pipe';
import { labelColorDefs } from 'app/modules/davesa/apps/participants/communications/communications.constants';
import { CommunicationsService } from 'app/modules/davesa/apps/participants/communications/communications.service';
import {
    Communication,
    CommunicationFolder,
    CommunicationLabel,
} from 'app/modules/davesa/apps/participants/communications/communications.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'communications-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule,
        RouterLink,
        MatIconModule,
        MatMenuModule,
        MatRippleModule,
        MatCheckboxModule,
        NgClass,
        DavesaScrollResetDirective,
        NgPlural,
        NgPluralCase,
        MatFormFieldModule,
        MatInputModule,
        DavesaFindByKeyPipe,
        DecimalPipe,
        DatePipe,
    ],
})
export class CommunicationsDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('infoDetailsPanelOrigin')
    private _infoDetailsPanelOrigin: MatButton;
    @ViewChild('infoDetailsPanel') private _infoDetailsPanel: TemplateRef<any>;

    folders: CommunicationFolder[];
    labelColors: any;
    labels: CommunicationLabel[];
    communication: Communication;
    replyFormActive: boolean = false;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _elementRef: ElementRef,
        private _communicationsService: CommunicationsService,
        private _overlay: Overlay,
        private _router: Router,
        private _viewContainerRef: ViewContainerRef
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the label colors
        this.labelColors = labelColorDefs;

        // Folders
        this._communicationsService.folders$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((folders: CommunicationFolder[]) => {
                this.folders = folders;
            });

        // Labels
        this._communicationsService.labels$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((labels: CommunicationLabel[]) => {
                this.labels = labels;
            });

        // Communication
        this._communicationsService.communication$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((communication: Communication) => {
                this.communication = communication;
            });

        // Selected communication changed
        this._communicationsService.selectedCommunicationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                // De-activate the reply form
                this.replyFormActive = false;
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
     * Get the current folder
     */
    getCurrentFolder(): any {
        return this._activatedRoute.snapshot.paramMap.get('folder');
    }

    /**
     * Move to folder
     *
     * @param folderSlug
     */
    moveToFolder(folderSlug: string): void {
        // Find the folder details
        const folder = this.folders.find((item) => item.slug === folderSlug);

        // Return if the current folder of the communication
        // is already equals to the given folder
        if (this.communication.folder === folder.id) {
            return;
        }

        // Update the communication object
        this.communication.folder = folder.id;

        // Update the communication on the server
        this._communicationsService
            .updateCommunication(this.communication.id, { folder: this.communication.folder })
            .subscribe();

        // Navigate to the parent
        this._router.navigate(['./'], {
            relativeTo: this._activatedRoute.parent,
        });
    }

    /**
     * Toggle label
     *
     * @param label
     */
    toggleLabel(label: CommunicationLabel): void {
        let deleted = false;

        // Update the communication object
        if (this.communication.labels.includes(label.id)) {
            // Set the deleted
            deleted = true;

            // Delete the label
            this.communication.labels.splice(this.communication.labels.indexOf(label.id), 1);
        } else {
            // Add the label
            this.communication.labels.push(label.id);
        }

        // Update the communication on the server
        this._communicationsService
            .updateCommunication(this.communication.id, { labels: this.communication.labels })
            .subscribe();

        // If the label was deleted...
        if (deleted) {
            // If the current activated route has a label parameter and it equals to the one we are removing...
            if (
                this._activatedRoute.snapshot.paramMap.get('label') &&
                this._activatedRoute.snapshot.paramMap.get('label') ===
                    label.slug
            ) {
                // Navigate to the parent
                this._router.navigate(['./'], {
                    relativeTo: this._activatedRoute.parent,
                });
            }
        }
    }

    /**
     * Toggle important
     */
    toggleImportant(): void {
        // Update the communication object
        this.communication.important = !this.communication.important;

        // Update the communication on the server
        this._communicationsService
            .updateCommunication(this.communication.id, { important: this.communication.important })
            .subscribe();

        // If the important was removed...
        if (!this.communication.important) {
            // If the current activated route has a filter parameter and it equals to the 'important'...
            if (
                this._activatedRoute.snapshot.paramMap.get('filter') &&
                this._activatedRoute.snapshot.paramMap.get('filter') ===
                    'important'
            ) {
                // Navigate to the parent
                this._router.navigate(['./'], {
                    relativeTo: this._activatedRoute.parent,
                });
            }
        }
    }

    /**
     * Toggle star
     */
    toggleStar(): void {
        // Update the communication object
        this.communication.starred = !this.communication.starred;

        // Update the communication on the server
        this._communicationsService
            .updateCommunication(this.communication.id, { starred: this.communication.starred })
            .subscribe();

        // If the star was removed...
        if (!this.communication.starred) {
            // If the current activated route has a filter parameter and it equals to the 'starred'...
            if (
                this._activatedRoute.snapshot.paramMap.get('filter') &&
                this._activatedRoute.snapshot.paramMap.get('filter') ===
                    'starred'
            ) {
                // Navigate to the parent
                this._router.navigate(['./'], {
                    relativeTo: this._activatedRoute.parent,
                });
            }
        }
    }

    /**
     * Toggle unread
     *
     * @param unread
     */
    toggleUnread(unread: boolean): void {
        // Update the communication object
        this.communication.unread = unread;

        // Update the communication on the server
        this._communicationsService
            .updateCommunication(this.communication.id, { unread: this.communication.unread })
            .subscribe();
    }

    /**
     * Reply
     */
    reply(): void {
        // Activate the reply form
        this.replyFormActive = true;

        // Scroll to the bottom of the details pane
        setTimeout(() => {
            this._elementRef.nativeElement.scrollTop =
                this._elementRef.nativeElement.scrollHeight;
        });
    }

    /**
     * Reply all
     */
    replyAll(): void {
        // Activate the reply form
        this.replyFormActive = true;

        // Scroll to the bottom of the details pane
        setTimeout(() => {
            this._elementRef.nativeElement.scrollTop =
                this._elementRef.nativeElement.scrollHeight;
        });
    }

    /**
     * Forward
     */
    forward(): void {
        // Activate the reply form
        this.replyFormActive = true;

        // Scroll to the bottom of the details pane
        setTimeout(() => {
            this._elementRef.nativeElement.scrollTop =
                this._elementRef.nativeElement.scrollHeight;
        });
    }

    /**
     * Discard
     */
    discard(): void {
        // Deactivate the reply form
        this.replyFormActive = false;
    }

    /**
     * Send
     */
    send(): void {
        // Deactivate the reply form
        this.replyFormActive = false;
    }

    /**
     * Open info details panel
     */
    openInfoDetailsPanel(): void {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            backdropClass: '',
            hasBackdrop: true,
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(
                    this._infoDetailsPanelOrigin._elementRef.nativeElement
                )
                .withFlexibleDimensions(true)
                .withViewportMargin(16)
                .withLockedPosition(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                    },
                ]),
        });

        // Create a portal from the template
        const templatePortal = new TemplatePortal(
            this._infoDetailsPanel,
            this._viewContainerRef
        );

        // Attach the portal to the overlay
        this._overlayRef.attach(templatePortal);

        // Subscribe to the backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            // If overlay exists and attached...
            if (this._overlayRef && this._overlayRef.hasAttached()) {
                // Detach it
                this._overlayRef.detach();
            }

            // If template portal exists and attached...
            if (templatePortal && templatePortal.isAttached) {
                // Detach it
                templatePortal.detach();
            }
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
