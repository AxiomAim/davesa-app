import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    Sponsor,
} from 'app/modules/davesa/apps/sponsors/sponsors.types';
import {
    BehaviorSubject,
    Observable,
    filter,
    map,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SponsorsService {
    // Private
    private _sponsor: BehaviorSubject<Sponsor | null> = new BehaviorSubject(
        null
    );
    private _sponsors: BehaviorSubject<Sponsor[] | null> = new BehaviorSubject(
        null
    );

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for sponsor
     */
    get sponsor$(): Observable<Sponsor> {
        return this._sponsor.asObservable();
    }

    /**
     * Getter for sponsors
     */
    get sponsors$(): Observable<Sponsor[]> {
        return this._sponsors.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get sponsors
     */
    getSponsors(): Observable<Sponsor[]> {
        return this._httpClient.get<Sponsor[]>('api/apps/sponsors/all').pipe(
            tap((sponsors) => {
                this._sponsors.next(sponsors);
                console.log('sponsors', sponsors)

            })
        );
    }

    /**
     * Search sponsors with given query
     *
     * @param query
     */
    searchSponsors(query: string): Observable<Sponsor[]> {
        return this._httpClient
            .get<Sponsor[]>('api/apps/sponsors/search', {
                params: { query },
            })
            .pipe(
                tap((sponsors) => {
                    this._sponsors.next(sponsors);
                })
            );
    }

    /**
     * Get sponsor by oid
     */
    getSponsorById(oid: string): Observable<Sponsor> {
        return this._sponsors.pipe(
            take(1),
            map((sponsors) => {
                // Find the sponsor
                const sponsor = sponsors.find((item) => item.oid === oid) || null;

                // Update the sponsor
                this._sponsor.next(sponsor);

                // Return the sponsor
                return sponsor;
            }),
            switchMap((sponsor) => {
                if (!sponsor) {
                    return throwError(
                        'Could not found sponsor with oid of ' + oid + '!'
                    );
                }

                return of(sponsor);
            })
        );
    }

    /**
     * Create sponsor
     */
    createSponsor(): Observable<Sponsor> {
        return this.sponsors$.pipe(
            take(1),
            switchMap((sponsors) =>
                this._httpClient
                    .post<Sponsor>('api/apps/sponsors/sponsor', {})
                    .pipe(
                        map((newSponsor) => {
                            // Update the sponsors with the new sponsor
                            this._sponsors.next([newSponsor, ...sponsors]);

                            // Return the new sponsor
                            return newSponsor;
                        })
                    )
            )
        );
    }

    /**
     * Update sponsor
     *
     * @param oid
     * @param sponsor
     */
    updateSponsor(oid: string, sponsor: Sponsor): Observable<Sponsor> {
        return this.sponsors$.pipe(
            take(1),
            switchMap((sponsors) =>
                this._httpClient
                    .patch<Sponsor>('api/apps/sponsors/sponsor', {
                        oid,
                        sponsor,
                    })
                    .pipe(
                        map((updatedSponsor) => {
                            // Find the index of the updated sponsor
                            const index = sponsors.findIndex(
                                (item) => item.oid === oid
                            );

                            // Update the sponsor
                            sponsors[index] = updatedSponsor;

                            // Update the sponsors
                            this._sponsors.next(sponsors);

                            // Return the updated sponsor
                            return updatedSponsor;
                        }),
                        switchMap((updatedSponsor) =>
                            this.sponsor$.pipe(
                                take(1),
                                filter((item) => item && item.oid === oid),
                                tap(() => {
                                    // Update the sponsor if it's selected
                                    this._sponsor.next(updatedSponsor);

                                    // Return the updated sponsor
                                    return updatedSponsor;
                                })
                            )
                        )
                    )
            )
        );
    }

    /**
     * Delete the sponsor
     *
     * @param id
     */
    deleteSponsor(oid: string): Observable<boolean> {
        return this.sponsors$.pipe(
            take(1),
            switchMap((sponsors) =>
                this._httpClient
                    .delete('api/apps/sponsors/sponsor', { params: { oid } })
                    .pipe(
                        map((isDeleted: boolean) => {
                            // Find the index of the deleted sponsor
                            const index = sponsors.findIndex(
                                (item) => item.oid === oid
                            );

                            // Delete the sponsor
                            sponsors.splice(index, 1);

                            // Update the sponsors
                            this._sponsors.next(sponsors);

                            // Return the deleted status
                            return isDeleted;
                        })
                    )
            )
        );
    }

}
