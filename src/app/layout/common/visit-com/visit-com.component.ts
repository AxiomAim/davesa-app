import { NgClass } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { DavesaDrawerComponent } from '@davesa/components/drawer';
import {
    DavesaConfig,
    DavesaConfigService,
    Scheme,
    Theme,
    Themes,
} from '@davesa/services/config';

import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'visit-com',
    templateUrl: './visit-com.component.html',
    styles: [
        `
            settings {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }

            @media (screen and min-width: 1280px) {
                empty-layout + settings .settings-cog {
                    right: 0 !important;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatIconModule,
        DavesaDrawerComponent,
        MatButtonModule,
        NgClass,
        MatTooltipModule,
    ],
})
export class VisitComComponent implements OnInit, OnDestroy {
    @Input() openVisit: boolean = false;
    config: DavesaConfig;
    layout: string;
    scheme: 'dark' | 'light';
    theme: string;
    themes: Themes;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _davesaConfigService: DavesaConfigService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._davesaConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: DavesaConfig) => {
                // Store the config
                this.config = config;
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
     * Set the layout on the config
     *
     * @param layout
     */
    setLayout(layout: string): void {
        // Clear the 'layout' query param to allow layout changes
        this._router
            .navigate([], {
                queryParams: {
                    layout: null,
                },
                queryParamsHandling: 'merge',
            })
            .then(() => {
                // Set the config
                this._davesaConfigService.config = { layout };
            });
    }

    /**
     * Set the scheme on the config
     *
     * @param scheme
     */
    setScheme(scheme: Scheme): void {
        this._davesaConfigService.config = { scheme };
    }

    /**
     * Set the theme on the config
     *
     * @param theme
     */
    setTheme(theme: Theme): void {
        this._davesaConfigService.config = { theme };
    }
}
