import { Injectable } from '@angular/core';
import { DavesaMockApiService, DavesaMockApiUtils } from '@davesa/lib/mock-api';
import {
    sponsors as sponsorsData,
} from 'app/mock-api/apps/sponsors/data';
import { assign, cloneDeep } from 'lodash-es';
import { from, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SponsorsMockApi {
    private _sponsors: any[] = sponsorsData;

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
        // @ Sponsors - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService.onGet('api/apps/sponsors/all').reply(() => {
            // Clone the sponsors
            const sponsors = cloneDeep(this._sponsors);

            // Sort the sponsors by the name field by default
            sponsors.sort((a, b) => a.name.localeCompare(b.name));

            // Return the response
            return [200, sponsors];
        });

        // -----------------------------------------------------------------------------------------------------
        // @ Sponsors Search - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/sponsors/search')
            .reply(({ request }) => {
                // Get the search query
                const query = request.params.get('query');

                // Clone the sponsors
                let sponsors = cloneDeep(this._sponsors);

                // If the query exists...
                if (query) {
                    // Filter the sponsors
                    sponsors = sponsors.filter(
                        (sponsor) =>
                            sponsor.name &&
                            sponsor.name
                                .toLowerCase()
                                .includes(query.toLowerCase())
                    );
                }

                // Sort the sponsors by the name field by default
                sponsors.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, sponsors];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Sponsor - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/sponsors/sponsor')
            .reply(({ request }) => {
                // Get the id from the params
                const id = request.params.get('id');

                // Clone the sponsors
                const sponsors = cloneDeep(this._sponsors);

                // Find the sponsor
                const sponsor = sponsors.find((item) => item.id === id);

                // Return the response
                return [200, sponsor];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Sponsor - POST
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPost('api/apps/sponsors/sponsor')
            .reply(() => {
                // Generate a new sponsor
                const newSponsor = {
                    id: DavesaMockApiUtils.guid(),
                    avatar: null,
                    name: 'New Sponsor',
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

                // Unshift the new sponsor
                this._sponsors.unshift(newSponsor);

                // Return the response
                return [200, newSponsor];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Sponsor - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPatch('api/apps/sponsors/sponsor')
            .reply(({ request }) => {
                // Get the id and sponsor
                const id = request.body.id;
                const sponsor = cloneDeep(request.body.sponsor);

                // Prepare the updated sponsor
                let updatedSponsor = null;

                // Find the sponsor and update it
                this._sponsors.forEach((item, index, sponsors) => {
                    if (item.id === id) {
                        // Update the sponsor
                        sponsors[index] = assign({}, sponsors[index], sponsor);

                        // Store the updated sponsor
                        updatedSponsor = sponsors[index];
                    }
                });

                // Return the response
                return [200, updatedSponsor];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Sponsor - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onDelete('api/apps/sponsors/sponsor')
            .reply(({ request }) => {
                // Get the id
                const id = request.params.get('id');

                // Find the sponsor and delete it
                this._sponsors.forEach((item, index) => {
                    if (item.id === id) {
                        this._sponsors.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });
        }
}
