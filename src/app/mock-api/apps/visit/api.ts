import { Injectable } from '@angular/core';
import { DavesaMockApiService } from '@davesa/lib/mock-api';
import {
    visits as visitsData,
    contacts as contactsData,
    messages as messagesData,
    profile as profileData,
} from 'app/mock-api/apps/visit/data';
import { assign, cloneDeep, omit } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class VisitMockApi {
    private _visits: any[] = visitsData;
    private _contacts: any[] = contactsData;
    private _messages: any[] = messagesData;
    private _profile: any = profileData;

    /**
     * Constructor
     */
    constructor(private _davesaMockApiService: DavesaMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();

        // Modify the visits array to attach certain data to it
        this._visits = this._visits.map((visit) => ({
            ...visit,
            // Get the actual contact object from the id and attach it to the visit
            contact: this._contacts.find(
                (contact) => contact.id === visit.contactId
            ),
            // Since we use same set of messages on all visits, we assign them here.
            messages: this._messages.map((message) => ({
                ...message,
                visitId: visit.id,
                contactId:
                    message.contactId === 'me'
                        ? this._profile.id
                        : visit.contactId,
                isMine: message.contactId === 'me',
            })),
        }));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Visits - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService.onGet('api/apps/visit/visits').reply(() => {
            // Clone the visits
            const visits = cloneDeep(this._visits);

            // Return the response
            return [200, visits];
        });

        // -----------------------------------------------------------------------------------------------------
        // @ Visit - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/visit/visit')
            .reply(({ request }) => {
                // Get the visit id
                const id = request.params.get('id');

                // Clone the visits
                const visits = cloneDeep(this._visits);

                // Find the visit we need
                const visit = visits.find((item) => item.id === id);

                // Return the response
                return [200, visit];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Visit - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPatch('api/apps/visit/visit')
            .reply(({ request }) => {
                // Get the id and visit
                const id = request.body.id;
                const visit = cloneDeep(request.body.visit);

                // Prepare the updated visit
                let updatedVisit = null;

                // Find the visit and update it
                this._visits.forEach((item, index, visits) => {
                    if (item.id === id) {
                        // Update the visit
                        visits[index] = assign({}, visits[index], visit);

                        // Store the updated visit
                        updatedVisit = visits[index];
                    }
                });

                // Return the response
                return [200, updatedVisit];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Contacts - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService.onGet('api/apps/visit/contacts').reply(() => {
            // Clone the contacts
            let contacts = cloneDeep(this._contacts);

            // Sort the contacts by the name field by default
            contacts.sort((a, b) => a.name.localeCompare(b.name));

            // Omit details and attachments from contacts
            contacts = contacts.map((contact) =>
                omit(contact, ['details', 'attachments'])
            );

            // Return the response
            return [200, contacts];
        });

        // -----------------------------------------------------------------------------------------------------
        // @ Contact Details - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/visit/contact')
            .reply(({ request }) => {
                // Get the contact id
                const id = request.params.get('id');

                // Clone the contacts
                const contacts = cloneDeep(this._contacts);

                // Find the contact
                const contact = contacts.find((item) => item.id === id);

                // Return the response
                return [200, contact];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Profile - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService.onGet('api/apps/visit/profile').reply(() => {
            // Clone the profile
            const profile = cloneDeep(this._profile);

            // Return the response
            return [200, profile];
        });
    }
}
