import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    forwardRef,
    inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DavesaHorizontalNavigationBasicItemComponent } from '@davesa/components/navigation/horizontal/components/basic/basic.component';
import { DavesaHorizontalNavigationDividerItemComponent } from '@davesa/components/navigation/horizontal/components/divider/divider.component';
import { DavesaHorizontalNavigationComponent } from '@davesa/components/navigation/horizontal/horizontal.component';
import { DavesaNavigationService } from '@davesa/components/navigation/navigation.service';
import { DavesaNavigationItem } from '@davesa/components/navigation/navigation.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'davesa-horizontal-navigation-branch-item',
    templateUrl: './branch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgClass,
        MatMenuModule,
        NgTemplateOutlet,
        DavesaHorizontalNavigationBasicItemComponent,
        forwardRef(() => DavesaHorizontalNavigationBranchItemComponent),
        DavesaHorizontalNavigationDividerItemComponent,
        MatTooltipModule,
        MatIconModule,
    ],
})
export class DavesaHorizontalNavigationBranchItemComponent
    implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_child: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _davesaNavigationService = inject(DavesaNavigationService);

    @Input() child: boolean = false;
    @Input() item: DavesaNavigationItem;
    @Input() name: string;
    @ViewChild('matMenu', { static: true }) matMenu: MatMenu;

    private _davesaHorizontalNavigationComponent: DavesaHorizontalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the parent navigation component
        this._davesaHorizontalNavigationComponent =
            this._davesaNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._davesaHorizontalNavigationComponent.onRefreshed
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
     * Trigger the change detection
     */
    triggerChangeDetection(): void {
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
        return item.id || index;
    }
}
