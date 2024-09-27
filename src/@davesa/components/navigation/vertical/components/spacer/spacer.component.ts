import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { DavesaNavigationService } from '@davesa/components/navigation/navigation.service';
import { DavesaNavigationItem } from '@davesa/components/navigation/navigation.types';
import { DavesaVerticalNavigationComponent } from '@davesa/components/navigation/vertical/vertical.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'davesa-vertical-navigation-spacer-item',
    templateUrl: './spacer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass],
})
export class DavesaVerticalNavigationSpacerItemComponent
    implements OnInit, OnDestroy
{
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _davesaNavigationService = inject(DavesaNavigationService);

    @Input() item: DavesaNavigationItem;
    @Input() name: string;

    private _davesaVerticalNavigationComponent: DavesaVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the parent navigation component
        this._davesaVerticalNavigationComponent =
            this._davesaNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._davesaVerticalNavigationComponent.onRefreshed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
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
    }
}
