import { coerceBooleanProperty } from '@angular/cdk/coercion';

import {
    Component,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
    viewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DavesaVisitService } from '@davesa/services/visit';
import { Subject, takeUntil } from 'rxjs';
import { DavesaDrawerComponent } from '../drawer';
import { Participant } from 'app/core/interfaces/participant.interface';
import { DavesaCardComponent } from '../card';

@Component({
    selector: 'davesa-visit-drawer',
    templateUrl: './visit-drawer.component.html',
    styleUrls: ['./visit-drawer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'davesaVisitDrawer',
    standalone: true,
    imports: [
        MatProgressBarModule,
        DavesaDrawerComponent,
        DavesaCardComponent
    ],
})
export class DavesaVisitDrawerComponent implements OnChanges, OnInit, OnDestroy {
    @ViewChild('visitDrawer') visitDrawer: DavesaDrawerComponent;
    private _davesaVisitService = inject(DavesaVisitService);

    @Input() participant: Participant = null;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        // Auto mode
        if ('autoMode' in changes) {
            // Set the auto mode in the service
            // this._davesaVisitService.setParticipant(
            //     coerceBooleanProperty(changes.participant.currentValue)
            // );
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the service
        this._davesaVisitService.participant$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {
                this.participant = value;
                this.visitDrawer.open();
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
