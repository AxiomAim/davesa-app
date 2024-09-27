import { Injectable } from '@angular/core';
import { DavesaMockApiService } from '@davesa/lib/mock-api';
import { clinic as clinicData } from 'app/mock-api/dashboards/clinic/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class ClinicMockApi {
    private _clinic: any = clinicData;

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
        // @ Sales - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/dashboards/clinic')
            .reply(() => [200, cloneDeep(this._clinic)]);
    }
}
