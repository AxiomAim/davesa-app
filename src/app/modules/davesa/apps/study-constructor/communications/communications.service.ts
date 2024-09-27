import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    Communication,
    CommunicationCategory,
    CommunicationFilter,
    CommunicationFolder,
    CommunicationLabel,
} from './communications.types';
import {
    BehaviorSubject,
    Observable,
    map,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommunicationsService {
    selectedCommunicationChanged: BehaviorSubject<any> = new BehaviorSubject(null);
    private _category: BehaviorSubject<CommunicationCategory> = new BehaviorSubject(
        null
    );
    private _filters: BehaviorSubject<CommunicationFilter[]> = new BehaviorSubject(null);
    private _folders: BehaviorSubject<CommunicationFolder[]> = new BehaviorSubject(null);
    private _labels: BehaviorSubject<CommunicationLabel[]> = new BehaviorSubject(null);
    private _communications: BehaviorSubject<Communication[]> = new BehaviorSubject(null);
    private _communicationsLoading: BehaviorSubject<boolean> = new BehaviorSubject(
        false
    );
    private _communication: BehaviorSubject<Communication> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for category
     */
    get category$(): Observable<CommunicationCategory> {
        return this._category.asObservable();
    }

    /**
     * Getter for filters
     */
    get filters$(): Observable<CommunicationFilter[]> {
        return this._filters.asObservable();
    }

    /**
     * Getter for folders
     */
    get folders$(): Observable<CommunicationFolder[]> {
        return this._folders.asObservable();
    }

    /**
     * Getter for labels
     */
    get labels$(): Observable<CommunicationLabel[]> {
        return this._labels.asObservable();
    }

    /**
     * Getter for communications
     */
    get communications$(): Observable<Communication[]> {
        return this._communications.asObservable();
    }

    /**
     * Getter for communications loading
     */
    get communicationsLoading$(): Observable<boolean> {
        return this._communicationsLoading.asObservable();
    }

    /**
     * Getter for communication
     */
    get communication$(): Observable<Communication> {
        return this._communication.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<any> {
        return this._pagination.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get filters
     */
    getFilters(): Observable<any> {
        return this._httpClient
            .get<CommunicationFilter[]>('api/apps/communications/filters')
            .pipe(
                tap((response: any) => {
                    this._filters.next(response);
                })
            );
    }

    /**
     * Get folders
     */
    getFolders(): Observable<any> {
        return this._httpClient
            .get<CommunicationFolder[]>('api/apps/communications/folders')
            .pipe(
                tap((response: any) => {
                    this._folders.next(response);
                })
            );
    }

    /**
     * Get labels
     */
    getLabels(): Observable<any> {
        return this._httpClient
            .get<CommunicationLabel[]>('api/apps/communications/labels')
            .pipe(
                tap((response: any) => {
                    this._labels.next(response);
                })
            );
    }

    /**
     * Get communications by filter
     */
    getCommunicationsByFilter(filter: string, page: string = '1'): Observable<any> {
        // Execute the communications loading with true
        this._communicationsLoading.next(true);

        return this._httpClient
            .get<Communication[]>('api/apps/communications/communications', {
                params: {
                    filter,
                    page,
                },
            })
            .pipe(
                tap((response: any) => {
                    this._category.next({
                        type: 'filter',
                        name: filter,
                    });
                    this._communications.next(response.communications);
                    this._pagination.next(response.pagination);
                    this._communicationsLoading.next(false);
                }),
                switchMap((response) => {
                    if (response.communications === null) {
                        return throwError({
                            message: 'Requested page is not available!',
                            pagination: response.pagination,
                        });
                    }

                    return of(response);
                })
            );
    }

    /**
     * Get communications by folder
     */
    getCommunicationsByFolder(folder: string, page: string = '1'): Observable<any> {
        // Execute the communications loading with true
        this._communicationsLoading.next(true);

        return this._httpClient
            .get<Communication[]>('api/apps/communications/communications', {
                params: {
                    folder,
                    page,
                },
            })
            .pipe(
                tap((response: any) => {
                    this._category.next({
                        type: 'folder',
                        name: folder,
                    });
                    this._communications.next(response.communications);
                    this._pagination.next(response.pagination);
                    this._communicationsLoading.next(false);
                }),
                switchMap((response) => {
                    if (response.communications === null) {
                        return throwError({
                            message: 'Requested page is not available!',
                            pagination: response.pagination,
                        });
                    }

                    return of(response);
                })
            );
    }

    /**
     * Get communications by label
     */
    getCommunicationsByLabel(label: string, page: string = '1'): Observable<any> {
        // Execute the communications loading with true
        this._communicationsLoading.next(true);

        return this._httpClient
            .get<Communication[]>('api/apps/communications/communications', {
                params: {
                    label,
                    page,
                },
            })
            .pipe(
                tap((response: any) => {
                    this._category.next({
                        type: 'label',
                        name: label,
                    });
                    this._communications.next(response.communications);
                    this._pagination.next(response.pagination);
                    this._communicationsLoading.next(false);
                }),
                switchMap((response) => {
                    if (response.communications === null) {
                        return throwError({
                            message: 'Requested page is not available!',
                            pagination: response.pagination,
                        });
                    }

                    return of(response);
                })
            );
    }

    /**
     * Get communication by id
     */
    getCommunicationById(id: string): Observable<any> {
        return this._communications.pipe(
            take(1),
            map((communications) => {
                // Find the communication
                const communication = communications.find((item) => item.id === id) || null;

                // Update the communication
                this._communication.next(communication);

                // Return the communication
                return communication;
            }),
            switchMap((communication) => {
                if (!communication) {
                    return throwError(
                        'Could not found communication with id of ' + id + '!'
                    );
                }

                return of(communication);
            })
        );
    }

    /**
     * Update communication
     *
     * @param id
     * @param communication
     */
    updateCommunication(id: string, communication: Communication): Observable<any> {
        return this._httpClient
            .patch('api/apps/communications/communication', {
                id,
                communication,
            })
            .pipe(
                tap(() => {
                    // Re-fetch the folders on communication update
                    // to get the updated counts on the sidebar
                    this.getFolders().subscribe();
                })
            );
    }

    /**
     * Reset the current communication
     */
    resetCommunication(): Observable<boolean> {
        return of(true).pipe(
            take(1),
            tap(() => {
                this._communication.next(null);
            })
        );
    }

    /**
     * Add label
     *
     * @param label
     */
    addLabel(label: CommunicationLabel): Observable<any> {
        return this.labels$.pipe(
            take(1),
            switchMap((labels) =>
                this._httpClient
                    .post<CommunicationLabel>('api/apps/communications/label', { label })
                    .pipe(
                        map((newLabel) => {
                            // Update the labels with the new label
                            this._labels.next([...labels, newLabel]);

                            // Return the new label
                            return newLabel;
                        })
                    )
            )
        );
    }

    /**
     * Update label
     *
     * @param id
     * @param label
     */
    updateLabel(id: string, label: CommunicationLabel): Observable<any> {
        return this.labels$.pipe(
            take(1),
            switchMap((labels) =>
                this._httpClient
                    .patch<CommunicationLabel>('api/apps/communications/label', {
                        id,
                        label,
                    })
                    .pipe(
                        map((updatedLabel: any) => {
                            // Find the index of the updated label within the labels
                            const index = labels.findIndex(
                                (item) => item.id === id
                            );

                            // Update the label
                            labels[index] = updatedLabel;

                            // Update the labels
                            this._labels.next(labels);

                            // Return the updated label
                            return updatedLabel;
                        })
                    )
            )
        );
    }

    /**
     * Delete label
     *
     * @param id
     */
    deleteLabel(id: string): Observable<any> {
        return this.labels$.pipe(
            take(1),
            switchMap((labels) =>
                this._httpClient
                    .delete('api/apps/communications/label', { params: { id } })
                    .pipe(
                        map((isDeleted: any) => {
                            // Find the index of the deleted label within the labels
                            const index = labels.findIndex(
                                (item) => item.id === id
                            );

                            // Delete the label
                            labels.splice(index, 1);

                            // Update the labels
                            this._labels.next(labels);

                            // Return the deleted status
                            return isDeleted;
                        })
                    )
            )
        );
    }
}
