import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DavesaLoadingBarComponent } from '@davesa/components/loading-bar';
import { AlertMessagesComponent } from '@davesa/components/alert-messages/alert-messages.component';
import { Subject } from 'rxjs';
import { DavesaVisitDrawerComponent } from '@davesa/components/visit-drawer';

@Component({
    selector: 'empty-layout',
    templateUrl: './empty.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DavesaLoadingBarComponent, 
        RouterOutlet, 
        AlertMessagesComponent,
        DavesaVisitDrawerComponent
    ],
})
export class EmptyLayoutComponent implements OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor() {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
