import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    Irb,
} from 'app/modules/davesa/apps/irbs/irbs.types';
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
export class IrbsService {
    // Private
    private _irb: BehaviorSubject<Irb | null> = new BehaviorSubject(
        null
    );
    private _irbs: BehaviorSubject<Irb[] | null> = new BehaviorSubject(
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
     * Getter for irb
     */
    get irb$(): Observable<Irb> {
        return this._irb.asObservable();
    }

    /**
     * Getter for irbs
     */
    get irbs$(): Observable<Irb[]> {
        return this._irbs.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get irbs
     */
    getIrbs(): Observable<Irb[]> {
        return this._httpClient.get<Irb[]>('api/apps/irbs/all').pipe(
            tap((irbs) => {
                this._irbs.next(irbs);
            })
        );
    }

    /**
     * Search irbs with given query
     *
     * @param query
     */
    searchIrbs(query: string): Observable<Irb[]> {
        return this._httpClient
            .get<Irb[]>('api/apps/irbs/search', {
                params: { query },
            })
            .pipe(
                tap((irbs) => {
                    this._irbs.next(irbs);
                })
            );
    }

    /**
     * Get irb by oid
     */
    getIrbById(oid: string): Observable<Irb> {
        return this._irbs.pipe(
            take(1),
            map((irbs) => {
                // Find the irb
                const irb = irbs.find((item) => item.oid === oid) || null;

                // Update the irb
                this._irb.next(irb);

                // Return the irb
                return irb;
            }),
            switchMap((irb) => {
                if (!irb) {
                    return throwError(
                        'Could not found irb with oid of ' + oid + '!'
                    );
                }

                return of(irb);
            })
        );
    }

    /**
     * Create irb
     */
    createIrb(): Observable<Irb> {
        return this.irbs$.pipe(
            take(1),
            switchMap((irbs) =>
                this._httpClient
                    .post<Irb>('api/apps/irbs/irb', {})
                    .pipe(
                        map((newIrb) => {
                            // Update the irbs with the new irb
                            this._irbs.next([newIrb, ...irbs]);

                            // Return the new irb
                            return newIrb;
                        })
                    )
            )
        );
    }

    /**
     * Update irb
     *
     * @param oid
     * @param irb
     */
    updateIrb(oid: string, irb: Irb): Observable<Irb> {
        return this.irbs$.pipe(
            take(1),
            switchMap((irbs) =>
                this._httpClient
                    .patch<Irb>('api/apps/irbs/irb', {
                        oid,
                        irb,
                    })
                    .pipe(
                        map((updatedIrb) => {
                            // Find the index of the updated irb
                            const index = irbs.findIndex(
                                (item) => item.oid === oid
                            );

                            // Update the irb
                            irbs[index] = updatedIrb;

                            // Update the irbs
                            this._irbs.next(irbs);

                            // Return the updated irb
                            return updatedIrb;
                        }),
                        switchMap((updatedIrb) =>
                            this.irb$.pipe(
                                take(1),
                                filter((item) => item && item.oid === oid),
                                tap(() => {
                                    // Update the irb if it's selected
                                    this._irb.next(updatedIrb);

                                    // Return the updated irb
                                    return updatedIrb;
                                })
                            )
                        )
                    )
            )
        );
    }

    /**
     * Delete the irb
     *
     * @param id
     */
    deleteIrb(oid: string): Observable<boolean> {
        return this.irbs$.pipe(
            take(1),
            switchMap((irbs) =>
                this._httpClient
                    .delete('api/apps/irbs/irb', { params: { oid } })
                    .pipe(
                        map((isDeleted: boolean) => {
                            // Find the index of the deleted irb
                            const index = irbs.findIndex(
                                (item) => item.oid === oid
                            );

                            // Delete the irb
                            irbs.splice(index, 1);

                            // Update the irbs
                            this._irbs.next(irbs);

                            // Return the deleted status
                            return isDeleted;
                        })
                    )
            )
        );
    }

}
