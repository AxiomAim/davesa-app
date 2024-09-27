import { Injectable } from '@angular/core';
import { DavesaMockApiService, DavesaMockApiUtils } from '@davesa/lib/mock-api';
import {
    participants as participantsData,
} from 'app/mock-api/apps/participants/data';
import { assign, cloneDeep } from 'lodash-es';
import { from, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParticipantsMockApi {
    private _participants: any[] = participantsData;

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
        // @ participants - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService.onGet('api/apps/participants/all').reply(() => {
            // Clone the participants
            const participants = cloneDeep(this._participants);

            // Sort the participants by the name field by default
            participants.sort((a, b) => a.name.localeCompare(b.name));

            // Return the response
            return [200, participants];
        });

        // -----------------------------------------------------------------------------------------------------
        // @ participants Search - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/participants/search')
            .reply(({ request }) => {
                // Get the search query
                const query = request.params.get('query');

                // Clone the participants
                let participants = cloneDeep(this._participants);

                // If the query exists...
                if (query) {
                    // Filter the participants
                    participants = participants.filter(
                        (participant) =>
                            participant.name &&
                            participant.name
                                .toLowerCase()
                                .includes(query.toLowerCase())
                    );
                }

                // Sort the participants by the name field by default
                participants.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, participants];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ participant - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/participants/participant')
            .reply(({ request }) => {
                // Get the id from the params
                const id = request.params.get('id');

                // Clone the participants
                const participants = cloneDeep(this._participants);

                // Find the participant
                const participant = participants.find((item) => item.id === id);

                // Return the response
                return [200, participant];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ participant - POST
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPost('api/apps/participants/participant')
            .reply(() => {
                // Generate a new participants
                const newParticipant = {
                    id: DavesaMockApiUtils.guid(),
                    avatar: null,
                    name: 'New Participant',
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

                // Unshift the new participant
                this._participants.unshift(newParticipant);

                // Return the response
                return [200, newParticipant];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ participant - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPatch('api/apps/participants/participant')
            .reply(({ request }) => {
                // Get the id and participant
                const id = request.body.id;
                const participant = cloneDeep(request.body.participant);

                // Prepare the updated participant
                let updatedParticipant = null;

                // Find the participant and update it
                this._participants.forEach((item, index, participants) => {
                    if (item.id === id) {
                        // Update the participant
                        participants[index] = assign({}, participants[index], participant);

                        // Store the updated participants
                        updatedParticipant = participants[index];
                    }
                });

                // Return the response
                return [200, updatedParticipant];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ participant - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onDelete('api/apps/participants/participant')
            .reply(({ request }) => {
                // Get the id
                const id = request.params.get('id');

                // Find the participant and delete it
                this._participants.forEach((item, index) => {
                    if (item.id === id) {
                        this._participants.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });
        }
}
