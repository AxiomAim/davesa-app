import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    forwardRef,
    inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DavesaNavigationService } from '@davesa/components/navigation/navigation.service';
import { DavesaNavigationItem } from '@davesa/components/navigation/navigation.types';
import { DavesaVerticalNavigationBasicItemComponent } from '@davesa/components/navigation/vertical/components/basic/basic.component';
import { DavesaVerticalNavigationCollapsableItemComponent } from '@davesa/components/navigation/vertical/components/collapsable/collapsable.component';
import { DavesaVerticalNavigationDividerItemComponent } from '@davesa/components/navigation/vertical/components/divider/divider.component';
import { DavesaVerticalNavigationSpacerItemComponent } from '@davesa/components/navigation/vertical/components/spacer/spacer.component';
import { DavesaVerticalNavigationComponent } from '@davesa/components/navigation/vertical/vertical.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'davesa-vertical-navigation-group-item',
    templateUrl: './group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgClass,
        MatIconModule,
        DavesaVerticalNavigationBasicItemComponent,
        DavesaVerticalNavigationCollapsableItemComponent,
        DavesaVerticalNavigationDividerItemComponent,
        forwardRef(() => DavesaVerticalNavigationGroupItemComponent),
        DavesaVerticalNavigationSpacerItemComponent,
    ],
})
export class DavesaVerticalNavigationGroupItemComponent
    implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_autoCollapse: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _davesaNavigationService = inject(DavesaNavigationService);

    @Input() autoCollapse: boolean;
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
