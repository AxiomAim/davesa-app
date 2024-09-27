import { Injectable } from '@angular/core';
import { DavesaMockApiService, DavesaMockApiUtils } from '@davesa/lib/mock-api';
import {
    visitStatus as visitStatusData,
} from 'app/mock-api/common/visit-status/data';
import { assign, cloneDeep } from 'lodash-es';
import { from, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VksktStatusMockApi {
    private _visitStatus: any[] = visitStatusData;

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
        // @ Cros - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService.onGet('api/common/visit-status/all').reply(() => {
            // Clone the cros
            const cros = cloneDeep(this._visitStatus);

            // Sort the cros by the name field by default
            cros.sort((a, b) => a.name.localeCompare(b.name));

            // Return the response
            return [200, cros];
        });

        // -----------------------------------------------------------------------------------------------------
        // @ Cros Search - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/cros/search')
            .reply(({ request }) => {
                // Get the search query
                const query = request.params.get('query');

                // Clone the cros
                let cros = cloneDeep(this._visitStatus);

                // If the query exists...
                if (query) {
                    // Filter the cros
                    cros = cros.filter(
                        (cro) =>
                            cro.name &&
                            cro.name
                                .toLowerCase()
                                .includes(query.toLowerCase())
                    );
                }

                // Sort the cros by the name field by default
                cros.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, cros];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Cro - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/cros/cro')
            .reply(({ request }) => {
                // Get the id from the params
                const id = request.params.get('id');

                // Clone the cros
                const cros = cloneDeep(this._visitStatus);

                // Find the cro
                const cro = cros.find((item) => item.id === id);

                // Return the response
                return [200, cro];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Cro - POST
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPost('api/apps/cros/cro')
            .reply(() => {
                // Generate a new cro
                const newCro = {
                    id: DavesaMockApiUtils.guid(),
                    avatar: null,
                    name: 'New Cro',
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

                // Unshift the new cro
                this._visitStatus.unshift(newCro);

                // Return the response
                return [200, newCro];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Cro - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPatch('api/apps/cros/cro')
            .reply(({ request }) => {
                // Get the id and cro
                const id = request.body.id;
                const cro = cloneDeep(request.body.cro);

                // Prepare the updated cro
                let updatedCro = null;

                // Find the cro and update it
                this._visitStatus.forEach((item, index, cros) => {
                    if (item.id === id) {
                        // Update the cro
                        cros[index] = assign({}, cros[index], cro);

                        // Store the updated cro
                        updatedCro = cros[index];
                    }
                });

                // Return the response
                return [200, updatedCro];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Cro - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onDelete('api/apps/cros/cro')
            .reply(({ request }) => {
                // Get the id
                const id = request.params.get('id');

                // Find the cro and delete it
                this._visitStatus.forEach((item, index) => {
                    if (item.id === id) {
                        this._visitStatus.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });
        }
}
