import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { DavesaMediaWatcherService } from '@davesa/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';
import { CommunicationsSidebarComponent } from './sidebar/sidebar.component';

@Component({
    selector: 'communications',
    templateUrl: './communications.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatSidenavModule, CommunicationsSidebarComponent, RouterOutlet],
})
export class CommunicationsComponent implements OnInit, OnDestroy {
    @ViewChild('drawer') drawer: MatDrawer;

    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private _davesaMediaWatcherService: DavesaMediaWatcherService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to media changes
        this._davesaMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode and drawerOpened if the given breakpoint is active
                if (matchingAliases.includes('md')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                } else {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
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
    }
}
