import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
    DavesaNavigationItem,
    DavesaNavigationService,
    DavesaVerticalNavigationComponent,
} from '@davesa/components/navigation';
import { CommunicationsComposeComponent } from 'app/modules/davesa/apps/participants/communications/compose/compose.component';
import { labelColorDefs } from 'app/modules/davesa/apps/participants/communications/communications.constants';
import { CommunicationsService } from 'app/modules/davesa/apps/participants/communications/communications.service';
import {
    CommunicationFilter,
    CommunicationFolder,
    CommunicationLabel,
} from 'app/modules/davesa/apps/participants/communications/communications.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'communications-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule, 
        MatIconModule, 
        DavesaVerticalNavigationComponent
    ],
})
export class CommunicationsSidebarComponent implements OnInit, OnDestroy {
    filters: CommunicationFilter[];
    folders: CommunicationFolder[];
    labels: CommunicationLabel[];
    menuData: DavesaNavigationItem[] = [];
    private _filtersMenuData: DavesaNavigationItem[] = [];
    private _foldersMenuData: DavesaNavigationItem[] = [];
    private _labelsMenuData: DavesaNavigationItem[] = [];
    private _otherMenuData: DavesaNavigationItem[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _communicationsService: CommunicationsService,
        private _matDialog: MatDialog,
        private _davesaNavigationService: DavesaNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Filters
        this._communicationsService.filters$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((filters: CommunicationFilter[]) => {
                this.filters = filters;

                // Generate menu links
                this._generateFiltersMenuLinks();
            });

        // Folders
        // this._communicationsService.folders$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((folders: CommunicationFolder[]) => {
        //         this.folders = folders;

        //         // Generate menu links
        //         this._generateFoldersMenuLinks();

        //         // Update navigation badge
        //         this._updateNavigationBadge(folders);
        //     });

        // Labels
        this._communicationsService.labels$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((labels: CommunicationLabel[]) => {
                this.labels = labels;

                // Generate menu links
                this._generateLabelsMenuLinks();
            });

        // Generate other menu links
        this._generateOtherMenuLinks();
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
     * Open compose dialog
     */
    openComposeDialog(): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(CommunicationsComposeComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Compose dialog was closed!');
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Generate menus for folders
     *
     * @private
     */
    private _generateFoldersMenuLinks(): void {
        // Reset the folders menu data
        this._foldersMenuData = [];

        // Iterate through the folders
        // this.folders.forEach((folder) => {
        //     // Generate menu item for the folder
        //     const menuItem: DavesaNavigationItem = {
        //         id: folder.id,
        //         title: folder.title,
        //         type: 'basic',
        //         icon: folder.icon,
        //         link: '/apps/participants/communications/' + folder.slug,
        //     };

        //     // If the count is available and is bigger than zero...
        //     if (folder.count && folder.count > 0) {
        //         // Add the count as a badge
        //         menuItem['badge'] = {
        //             title: folder.count + '',
        //         };
        //     }

        //     // Push the menu item to the folders menu data
        //     this._foldersMenuData.push(menuItem);
        // });

        // Update the menu data
        this._updateMenuData();
    }

    /**
     * Generate menus for filters
     *
     * @private
     */
    private _generateFiltersMenuLinks(): void {
        // Reset the filters menu
        this._filtersMenuData = [];

        // Iterate through the filters
        // this.filters.forEach((filter) => {
        //     // Generate menu item for the filter
        //     this._filtersMenuData.push({
        //         id: filter.id,
        //         title: filter.title,
        //         type: 'basic',
        //         icon: filter.icon,
        //         link: '/apps/participants/communications/filter/' + filter.slug,
        //     });
        // });

        // Update the menu data
        this._updateMenuData();
    }

    /**
     * Generate menus for labels
     *
     * @private
     */
    private _generateLabelsMenuLinks(): void {
        // Reset the labels menu
        this._labelsMenuData = [];

        // Iterate through the labels
        // this.labels.forEach((label) => {
        //     // Generate menu item for the label
        //     this._labelsMenuData.push({
        //         id: label.id,
        //         title: label.title,
        //         type: 'basic',
        //         icon: 'heroicons_outline:tag',
        //         classes: {
        //             icon: labelColorDefs[label.color].text,
        //         },
        //         link: '/apps/participants/communications/label/' + label.slug,
        //     });
        // });

        // Update the menu data
        this._updateMenuData();
    }

    /**
     * Generate other menus
     *
     * @private
     */
    private _generateOtherMenuLinks(): void {
        // Settings menu
        this._otherMenuData.push({
            title: 'Settings',
            type: 'basic',
            icon: 'heroicons_outline:cog-8-tooth',
            link: '/apps/participants/communications/settings',
        });

        // Update the menu data
        this._updateMenuData();
    }

    /**
     * Update the menu data
     *
     * @private
     */
    private _updateMenuData(): void {
        this.menuData = [
            {
                title: 'MAILBOXES',
                type: 'group',
                children: [...this._foldersMenuData],
            },
            {
                title: 'FILTERS',
                type: 'group',
                children: [...this._filtersMenuData],
            },
            {
                title: 'LABELS',
                type: 'group',
                children: [...this._labelsMenuData],
            },
            {
                type: 'spacer',
            },
            ...this._otherMenuData,
        ];
    }

    /**
     * Update the navigation badge using the
     * unread count of the inbox folder
     *
     * @param folders
     * @private
     */
    private _updateNavigationBadge(folders: CommunicationFolder[]): void {
        // Get the inbox folder
        const inboxFolder = this.folders.find(
            (folder) => folder.slug === 'inbox'
        );

        // Get the component -> navigation data -> item
        const mainNavigationComponent =
            this._davesaNavigationService.getComponent<DavesaVerticalNavigationComponent>(
                'mainNavigation'
            );

        // If the main navigation component exists...
        if (mainNavigationComponent) {
            const mainNavigation = mainNavigationComponent.navigation;
            const menuItem = this._davesaNavigationService.getItem(
                'apps.participants.communications',
                mainNavigation
            );

            // Update the badge title of the item
            menuItem.badge.title = inboxFolder.count + '';

            // Refresh the navigation
            mainNavigationComponent.refresh();
        }
    }
}
