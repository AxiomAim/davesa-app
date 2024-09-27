import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { davesaAnimations } from '@davesa/animations';
import { DavesaNavigationService } from '@davesa/components/navigation/navigation.service';
import { DavesaNavigationItem } from '@davesa/components/navigation/navigation.types';
import { DavesaUtilsService } from '@davesa/services/utils/utils.service';
import { ReplaySubject, Subject } from 'rxjs';
import { DavesaHorizontalNavigationBasicItemComponent } from './components/basic/basic.component';
import { DavesaHorizontalNavigationBranchItemComponent } from './components/branch/branch.component';
import { DavesaHorizontalNavigationSpacerItemComponent } from './components/spacer/spacer.component';

@Component({
    selector: 'davesa-horizontal-navigation',
    templateUrl: './horizontal.component.html',
    styleUrls: ['./horizontal.component.scss'],
    animations: davesaAnimations,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'davesaHorizontalNavigation',
    standalone: true,
    imports: [
        DavesaHorizontalNavigationBasicItemComponent,
        DavesaHorizontalNavigationBranchItemComponent,
        DavesaHorizontalNavigationSpacerItemComponent,
    ],
})
export class DavesaHorizontalNavigationComponent
    implements OnChanges, OnInit, OnDestroy
{
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _davesaNavigationService = inject(DavesaNavigationService);
    private _davesaUtilsService = inject(DavesaUtilsService);

    @Input() name: string = this._davesaUtilsService.randomId();
    @Input() navigation: DavesaNavigationItem[];

    onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
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
        // Navigation
        if ('navigation' in changes) {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Make sure the name input is not an empty string
        if (this.name === '') {
            this.name = this._davesaUtilsService.randomId();
        }

        // Register the navigation component
        this._davesaNavigationService.registerComponent(this.name, this);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Deregister the navigation component from the registry
        this._davesaNavigationService.deregisterComponent(this.name);

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Refresh the component to apply the changes
     */
    refresh(): void {
        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Execute the observable
        this.onRefreshed.next(true);
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
