import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { davesaAnimations } from '@davesa/animations';
import { DavesaAlertService } from '@davesa/components/alert/alert.service';
import {
    DavesaAlertAppearance,
    DavesaAlertType,
} from '@davesa/components/alert/alert.types';
import { DavesaUtilsService } from '@davesa/services/utils/utils.service';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
    selector: 'davesa-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: davesaAnimations,
    exportAs: 'davesaAlert',
    standalone: true,
    imports: [MatIconModule, MatButtonModule],
})
export class DavesaAlertComponent implements OnChanges, OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_dismissible: BooleanInput;
    static ngAcceptInputType_dismissed: BooleanInput;
    static ngAcceptInputType_showIcon: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _davesaAlertService = inject(DavesaAlertService);
    private _davesaUtilsService = inject(DavesaUtilsService);

    @Input() appearance: DavesaAlertAppearance = 'soft';
    @Input() dismissed: boolean = false;
    @Input() dismissible: boolean = false;
    @Input() name: string = this._davesaUtilsService.randomId();
    @Input() showIcon: boolean = true;
    @Input() type: DavesaAlertType = 'primary';
    @Output() readonly dismissedChanged: EventEmitter<boolean> =
        new EventEmitter<boolean>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            'davesa-alert-appearance-border': this.appearance === 'border',
            'davesa-alert-appearance-fill': this.appearance === 'fill',
            'davesa-alert-appearance-outline': this.appearance === 'outline',
            'davesa-alert-appearance-soft': this.appearance === 'soft',
            'davesa-alert-dismissed': this.dismissed,
            'davesa-alert-dismissible': this.dismissible,
            'davesa-alert-show-icon': this.showIcon,
            'davesa-alert-type-primary': this.type === 'primary',
            'davesa-alert-type-accent': this.type === 'accent',
            'davesa-alert-type-warn': this.type === 'warn',
            'davesa-alert-type-basic': this.type === 'basic',
            'davesa-alert-type-info': this.type === 'info',
            'davesa-alert-type-success': this.type === 'success',
            'davesa-alert-type-warning': this.type === 'warning',
            'davesa-alert-type-error': this.type === 'error',
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        // Dismissed
        if ('dismissed' in changes) {
            // Coerce the value to a boolean
            this.dismissed = coerceBooleanProperty(
                changes.dismissed.currentValue
            );

            // Dismiss/show the alert
            this._toggleDismiss(this.dismissed);
        }

        // Dismissible
        if ('dismissible' in changes) {
            // Coerce the value to a boolean
            this.dismissible = coerceBooleanProperty(
                changes.dismissible.currentValue
            );
        }

        // Show icon
        if ('showIcon' in changes) {
            // Coerce the value to a boolean
            this.showIcon = coerceBooleanProperty(
                changes.showIcon.currentValue
            );
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the dismiss calls
        this._davesaAlertService.onDismiss
            .pipe(
                filter((name) => this.name === name),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                // Dismiss the alert
                this.dismiss();
            });

        // Subscribe to the show calls
        this._davesaAlertService.onShow
            .pipe(
                filter((name) => this.name === name),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                // Show the alert
                this.show();
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
     * Dismiss the alert
     */
    dismiss(): void {
        // Return if the alert is already dismissed
        if (this.dismissed) {
            return;
        }

        // Dismiss the alert
        this._toggleDismiss(true);
    }

    /**
     * Show the dismissed alert
     */
    show(): void {
        // Return if the alert is already showing
        if (!this.dismissed) {
            return;
        }

        // Show the alert
        this._toggleDismiss(false);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Dismiss/show the alert
     *
     * @param dismissed
     * @private
     */
    private _toggleDismiss(dismissed: boolean): void {
        // Return if the alert is not dismissible
        if (!this.dismissible) {
            return;
        }

        // Set the dismissed
        this.dismissed = dismissed;

        // Execute the observable
        this.dismissedChanged.next(this.dismissed);

        // Notify the change detector
        this._changeDetectorRef.markForCheck();
    }
}
