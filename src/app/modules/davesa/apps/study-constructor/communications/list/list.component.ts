import { DatePipe, NgClass } from '@angular/common';
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommunicationsComponent } from 'app/modules/davesa/apps/participants/communications/communications.component';
import { CommunicationsService } from 'app/modules/davesa/apps/participants/communications/communications.service';
import {
    Communication,
    CommunicationCategory,
} from 'app/modules/davesa/apps/participants/communications/communications.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'communications-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        RouterLink,
        MatProgressBarModule,
        NgClass,
        RouterOutlet,
        DatePipe,
    ],
})
export class CommunicationsListComponent implements OnInit, OnDestroy {
    @ViewChild('mailList') mailList: ElementRef;

    category: CommunicationCategory;
    communications: Communication[];
    communicationsLoading: boolean = false;
    pagination: any;
    selectedCommunication: Communication;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        public communicationsComponent: CommunicationsComponent,
        private _communicationsService: CommunicationsService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Category
        this._communicationsService.category$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((category: CommunicationCategory) => {
                this.category = category;
            });

        // Communications
        this._communicationsService.communications$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((communications: Communication[]) => {
                this.communications = communications;
            });

        // Communications loading
        this._communicationsService.communicationsLoading$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((communicationsLoading: boolean) => {
                this.communicationsLoading = communicationsLoading;

                // If the mail list element is available & the communications are loaded...
                if (this.mailList && !communicationsLoading) {
                    // Reset the mail list element scroll position to top
                    this.mailList.nativeElement.scrollTo(0, 0);
                }
            });

        // Pagination
        this._communicationsService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination) => {
                this.pagination = pagination;
            });

        // Selected mail
        this._communicationsService.communication$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mail: Communication) => {
                this.selectedCommunication = mail;
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
     * On mail selected
     *
     * @param mail
     */
    onCommunicationSelected(mail: Communication): void {
        // If the mail is unread...
        if (mail.unread) {
            // Update the mail object
            mail.unread = false;

            // Update the mail on the server
            this._communicationsService
                .updateCommunication(mail.id, { unread: false })
                .subscribe();
        }

        // Execute the mailSelected observable
        this._communicationsService.selectedCommunicationChanged.next(mail);
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
