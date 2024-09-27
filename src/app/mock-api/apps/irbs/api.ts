import { Injectable } from '@angular/core';
import { DavesaMockApiService, DavesaMockApiUtils } from '@davesa/lib/mock-api';
import {
    irbs as irbsData,
} from 'app/mock-api/apps/irbs/data';
import { assign, cloneDeep } from 'lodash-es';
import { from, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IrbsMockApi {
    private _irbs: any[] = irbsData;

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
        // @ Irbs - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService.onGet('api/apps/irbs/all').reply(() => {
            // Clone the irbs
            const irbs = cloneDeep(this._irbs);

            // Sort the irbs by the name field by default
            irbs.sort((a, b) => a.name.localeCompare(b.name));

            // Return the response
            return [200, irbs];
        });

        // -----------------------------------------------------------------------------------------------------
        // @ Irbs Search - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/irbs/search')
            .reply(({ request }) => {
                // Get the search query
                const query = request.params.get('query');

                // Clone the irbs
                let irbs = cloneDeep(this._irbs);

                // If the query exists...
                if (query) {
                    // Filter the irbs
                    irbs = irbs.filter(
                        (irb) =>
                            irb.name &&
                            irb.name
                                .toLowerCase()
                                .includes(query.toLowerCase())
                    );
                }

                // Sort the irbs by the name field by default
                irbs.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, irbs];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Irb - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/irbs/irb')
            .reply(({ request }) => {
                // Get the id from the params
                const id = request.params.get('id');

                // Clone the irbs
                const irbs = cloneDeep(this._irbs);

                // Find the irb
                const irb = irbs.find((item) => item.id === id);

                // Return the response
                return [200, irb];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Irb - POST
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPost('api/apps/irbs/irb')
            .reply(() => {
                // Generate a new irb
                const newIrb = {
                    id: DavesaMockApiUtils.guid(),
                    avatar: null,
                    name: 'New Irb',
                    emails: [],
                    phoneNumbers: [],
                    job: {
                        title: '',
                        company: '',
                    },
                    birthday: null,
                    address: null,
                    notes: null,
                    tags: [],
                };

                // Unshift the new irb
                this._irbs.unshift(newIrb);

                // Return the response
                return [200, newIrb];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Irb - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPatch('api/apps/irbs/irb')
            .reply(({ request }) => {
                // Get the id and irb
                const id = request.body.id;
                const irb = cloneDeep(request.body.irb);

                // Prepare the updated irb
                let updatedIrb = null;

                // Find the irb and update it
                this._irbs.forEach((item, index, irbs) => {
                    if (item.id === id) {
                        // Update the irb
                        irbs[index] = assign({}, irbs[index], irb);

                        // Store the updated irb
                        updatedIrb = irbs[index];
                    }
                });

                // Return the response
                return [200, updatedIrb];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Irb - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onDelete('api/apps/irbs/irb')
            .reply(({ request }) => {
                // Get the id
                const id = request.params.get('id');

                // Find the irb and delete it
                this._irbs.forEach((item, index) => {
                    if (item.id === id) {
                        this._irbs.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });
        }
}
