import { Injectable } from '@angular/core';
import { DavesaMockApiService } from '@davesa/lib/mock-api';
import { davesa, feather, heroicons, material } from 'app/mock-api/ui/icons/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class IconsMockApi {
    private readonly _davesa: any = davesa;
    private readonly _feather: any = feather;
    private readonly _heroicons: any = heroicons;
    private readonly _material: any = material;

    /**
     * Constructor
     */
    constructor(private _davesaMockApiService: DavesaMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Davesa icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService.onGet('api/ui/icons/davesa').reply(() => [
            200,
            {
                namespace: 'davesa',
                name: 'Davesa',
                grid: 'icon-size-6',
                list: cloneDeep(this._davesa),
            },
        ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Feather icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService.onGet('api/ui/icons/feather').reply(() => [
            200,
            {
                namespace: 'feather',
                name: 'Feather',
                grid: 'icon-size-6',
                list: cloneDeep(this._feather),
            },
        ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Heroicons outline icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/ui/icons/heroicons-outline')
            .reply(() => [
                200,
                {
                    namespace: 'heroicons_outline',
                    name: 'Heroicons Outline',
                    grid: 'icon-size-6',
                    list: cloneDeep(this._heroicons),
                },
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Heroicons solid icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/ui/icons/heroicons-solid')
            .reply(() => [
                200,
                {
                    namespace: 'heroicons_solid',
                    name: 'Heroicons Solid',
                    grid: 'icon-size-6',
                    list: cloneDeep(this._heroicons),
                },
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Heroicons mini icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/ui/icons/heroicons-mini')
            .reply(() => [
                200,
                {
                    namespace: 'heroicons_mini',
                    name: 'Heroicons Mini',
                    grid: 'icon-size-5',
                    list: cloneDeep(this._heroicons),
                },
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Material solid icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/ui/icons/material-solid')
            .reply(() => [
                200,
                {
                    namespace: 'mat_solid',
                    name: 'Material Solid',
                    grid: 'icon-size-6',
                    list: cloneDeep(this._material),
                },
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Material outline icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/ui/icons/material-outline')
            .reply(() => [
                200,
                {
                    namespace: 'mat_outline',
                    name: 'Material Outline',
                    grid: 'icon-size-6',
                    list: cloneDeep(this._material),
                },
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Material twotone icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/ui/icons/material-twotone')
            .reply(() => [
                200,
                {
                    namespace: '',
                    name: 'Material Twotone',
                    grid: 'icon-size-6',
                    list: cloneDeep(this._material),
                },
            ]);
    }
}
