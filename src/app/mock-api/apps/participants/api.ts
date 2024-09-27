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
        // @ Participants - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService.onGet('api/apps/participants/all').reply(() => {
            // Clone the participants
            const participants = cloneDeep(this._participants);

            // Sort the participants by the name field by default
            participants.sort((a, b) => a.subject_id.localeCompare(b.subject_id));

            // Return the response
            return [200, participants];
        });

        // -----------------------------------------------------------------------------------------------------
        // @ Participants Search - GET
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
                            participant.subject_id &&
                            participant.subject_id
                                .toLowerCase()
                                .includes(query.toLowerCase())
                    );
                }

                // Sort the participants by the subject_id field by default
                participants.sort((a, b) => a.subject_id.localeCompare(b.subject_id));

                // Return the response
                return [200, participants];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Participant - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/participants/participant')
            .reply(({ request }) => {
                // Get the oid from the params
                const oid = request.params.get('oid');

                // Clone the participants
                const participants = cloneDeep(this._participants);

                // Find the participant
                const participant = participants.find((item) => item.oid === oid);

                // Return the response
                return [200, participant];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Participant - POST
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPost('api/apps/participants/participant')
            .reply(() => {
                // Generate a new participant
                const newParticipant = {
                    oid: DavesaMockApiUtils.guid(),
                    avatar: null,
                    subject_id: 'New Participant',
                    first_name: null,
                    last_name: null,
                    gender: null,
                    statur: null,
                    current_address: null,
                    permanent_address: null,
                    emails: null,
                    birth_date: null,
                };

                // Unshift the new participant
                this._participants.unshift(newParticipant);

                // Return the response
                return [200, newParticipant];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Participant - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPatch('api/apps/participants/participant')
            .reply(({ request }) => {
                // Get the oid and participant
                const oid = request.body.oid;
                const participant = cloneDeep(request.body.participant);

                // Prepare the updated participant
                let updatedParticipant = null;

                // Find the participant and update it
                this._participants.forEach((item, index, participants) => {
                    if (item.oid === oid) {
                        // Update the participant
                        participants[index] = assign({}, participants[index], participant);

                        // Store the updated participant
                        updatedParticipant = participants[index];
                    }
                });

                // Return the response
                return [200, updatedParticipant];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Participant - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onDelete('api/apps/participants/participant')
            .reply(({ request }) => {
                // Get the oid
                const oid = request.params.get('oid');

                // Find the participant and delete it
                this._participants.forEach((item, index) => {
                    if (item.oid === oid) {
                        this._participants.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });
        }
}
