import { Injectable } from '@angular/core';
import { DavesaMockApiService, DavesaMockApiUtils } from '@davesa/lib/mock-api';
import {
    filters as filtersData,
    folders as foldersData,
    labels as labelsData,
    communications as communicationsData,
    settings as settingsData,
} from 'app/mock-api/apps/communications/data';
import { assign, cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class CommunicationsMockApi {
    private _filters: any[] = filtersData;
    private _folders: any[] = foldersData;
    private _communications: any[] = communicationsData;
    private _labels: any[] = labelsData;
    private _settings: any = settingsData;

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
        // @ Settings - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/communications/settings')
            .reply(() => [200, cloneDeep(this._settings)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Settings - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPatch('api/apps/communications/settings')
            .reply(({ request }) => {
                // Get the settings
                const settings = cloneDeep(request.body.settings);

                // Update the settings
                this._settings = assign({}, this._settings, settings);

                // Return the response
                return [200, cloneDeep(this._settings)];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Folders - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService.onGet('api/apps/communications/folders').reply(() => {
            let count = 0;

            // Iterate through the folders
            this._folders.forEach((folder) => {
                // Get the communications of this folder
                const communications = this._communications.filter(
                    (communication) => communication.folder === folder.id
                );

                // If we are counting the 'sent' or the 'trash' folder...
                if (folder.slug === 'sent' || folder.slug === 'trash') {
                    // Always set the count to 0
                    count = 0;
                }
                // If we are counting the 'drafts' or the 'spam' folder...
                else if (
                    folder.slug === 'drafts' ||
                    folder.slug === 'trash' ||
                    folder.slug === 'spam'
                ) {
                    // Set the count to the count of all communications
                    count = communications.length;
                }
                // Otherwise ('inbox')...
                else {
                    // Go through the communications and count the unread ones
                    communications.forEach((communication) => {
                        if (communication.unread) {
                            count++;
                        }
                    });
                }

                // Append the count to the folder mock-api
                folder.count = count;

                // Reset the count
                count = 0;
            });

            // Return the response
            return [200, cloneDeep(this._folders)];
        });

        // -----------------------------------------------------------------------------------------------------
        // @ Filters - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/communications/filters')
            .reply(() => [200, cloneDeep(this._filters)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Labels - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/communications/labels')
            .reply(() => [200, cloneDeep(this._labels)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Labels - POST
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPost('api/apps/communications/label')
            .reply(({ request }) => {
                // Get the label
                const label = cloneDeep(request.body.label);

                // Generate an id
                label.id = DavesaMockApiUtils.guid();

                // Generate a slug
                label.slug = label.title
                    .toLowerCase()
                    .replace(/ /g, '-')
                    .replace(/[-]+/g, '-')
                    .replace(/[^\w-]+/g, '');

                // Check if the slug is being used and update it if necessary
                const originalSlug = label.slug;

                let sameSlug;
                let slugSuffix = 1;

                do {
                    sameSlug = this._labels.filter(
                        (item) => item.slug === label.slug
                    );

                    if (sameSlug.length > 0) {
                        label.slug = originalSlug + '-' + slugSuffix;
                        slugSuffix++;
                    }
                } while (sameSlug.length > 0);

                // Add the label
                this._labels.push(label);

                // Return the response
                return [200, label];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Labels - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPatch('api/apps/communications/label')
            .reply(({ request }) => {
                // Get the id and label
                const id = request.body.id;
                const label = cloneDeep(request.body.label);

                // Prepare the updated label
                let updatedLabel = null;

                // Find the label and update it
                this._labels.forEach((item, index, labels) => {
                    if (item.id === id) {
                        // Update the slug
                        label.slug = label.title
                            .toLowerCase()
                            .replace(/ /g, '-')
                            .replace(/[-]+/g, '-')
                            .replace(/[^\w-]+/g, '');

                        // Update the label
                        labels[index] = assign({}, labels[index], label);

                        // Store the updated label
                        updatedLabel = labels[index];
                    }
                });

                // Return the response
                return [200, updatedLabel];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Labels - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onDelete('api/apps/communications/label')
            .reply(({ request }) => {
                // Get the id
                const id = request.params.get('id');

                // Find the label and delete it
                const index = this._labels.findIndex((item) => item.id === id);
                this._labels.splice(index, 1);

                // Get all the communications that have the label
                const communicationsWithLabel = this._communications.filter(
                    (communication) => communication.labels.indexOf(id) > -1
                );

                // Iterate through them and remove the label
                communicationsWithLabel.forEach((communication) => {
                    communication.labels.splice(communication.labels.indexOf(id), 1);
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Communcations - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/communications/communications', 625)
            .reply(({ request }) => {
                // First, decide if communications are requested by folder, filter or label
                const byFolder = request.params.get('folder');
                const byFilter = request.params.get('filter');
                const byLabel = request.params.get('label');

                // Clone the communications mock-api to prevent accidental mock-api updates
                let communications: any[] | null = cloneDeep(this._communications);

                // Filter the communications depending on the requested by type
                communications = communications.filter((communication) => {
                    if (byFolder) {
                        return (
                            communication.folder ===
                            this._folders.find(
                                (folder) => folder.slug === byFolder
                            ).id
                        );
                    }

                    if (byFilter) {
                        return communication[byFilter] === true;
                    }

                    if (byLabel) {
                        return communication.labels.includes(
                            this._labels.find((label) => label.slug === byLabel)
                                .id
                        );
                    }
                });

                // Sort by date - descending
                communications.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                );

                // Figure out the cc and bcc counts
                communications.forEach((communication) => {
                    communication.ccCount = communication.cc ? communication.cc.length : 0;
                    communication.bccCount = communication.bcc ? communication.bcc.length : 0;
                });

                // Paginate - Start
                const communicationsLength = communications.length;
                const resultsPerPage = 10;

                // Get the requested page number
                const page = parseInt(request.params.get('page') ?? '1', 10);

                // Calculate pagination details
                const begin = (page - 1) * resultsPerPage;
                const end = Math.min(resultsPerPage * page, communicationsLength);
                const lastPage = Math.max(
                    Math.ceil(communicationsLength / resultsPerPage),
                    1
                );

                // Prepare the pagination object
                let pagination = {};

                // If the requested page number is bigger than
                // the last possible page number, return null for
                // communications but also send the last possible page so
                // the app can navigate to there
                if (page > lastPage) {
                    communications = null;
                    pagination = {
                        lastPage,
                    };
                } else {
                    // Paginate the results by 10
                    communications = communications.slice(begin, end);

                    // Prepare the pagination mock-api
                    pagination = {
                        totalResults: communicationsLength,
                        resultsPerPage: resultsPerPage,
                        currentPage: page,
                        lastPage: lastPage,
                        startIndex: begin,
                        endIndex: end - 1,
                    };
                }

                // Return the response
                return [
                    200,
                    {
                        communications,
                        pagination,
                    },
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Communication - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/communications/communication')
            .reply(({ request }) => {
                // Get the id from the params
                const id = request.params.get('id');

                // Clone the communications mock-api to prevent accidental mock-api updates
                const communications = cloneDeep(this._communications);

                // Find the communication
                const communication = communications.find((item) => item.id === id);

                return [200, communication];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Communication - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPatch('api/apps/communications/communication')
            .reply(({ request }) => {
                // Get the id and communication
                const id = request.body.id;
                const communication = cloneDeep(request.body.communication);

                // Prepare the updated communication
                let updatedCommunication = null;

                // Find the communication and update it
                this._communications.forEach((item, index, communications) => {
                    if (item.id === id) {
                        // Update the communication
                        communications[index] = assign({}, communications[index], communication);

                        // Store the updated communication
                        updatedCommunication = communications[index];
                    }
                });

                // Return the response
                return [200, updatedCommunication];
                
            });
    }
}
