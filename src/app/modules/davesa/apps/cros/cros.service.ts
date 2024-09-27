import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    Cro,
} from 'app/modules/davesa/apps/cros/cros.types';
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
export class CrosService {
    // Private
    private _cro: BehaviorSubject<Cro | null> = new BehaviorSubject(
        null
    );
    private _cros: BehaviorSubject<Cro[] | null> = new BehaviorSubject(
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
     * Getter for cro
     */
    get cro$(): Observable<Cro> {
        return this._cro.asObservable();
    }

    /**
     * Getter for cros
     */
    get cros$(): Observable<Cro[]> {
        return this._cros.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get cros
     */
    getCros(): Observable<Cro[]> {
        return this._httpClient.get<Cro[]>('api/apps/cros/all').pipe(
            tap((cros) => {
                this._cros.next(cros);
            })
        );
    }

    /**
     * Search cros with given query
     *
     * @param query
     */
    searchCros(query: string): Observable<Cro[]> {
        return this._httpClient
            .get<Cro[]>('api/apps/cros/search', {
                params: { query },
            })
            .pipe(
                tap((cros) => {
                    this._cros.next(cros);
                })
            );
    }

    /**
     * Get cro by oid
     */
    getCroById(oid: string): Observable<Cro> {
        return this._cros.pipe(
            take(1),
            map((cros) => {
                // Find the cro
                const cro = cros.find((item) => item.oid === oid) || null;

                // Update the cro
                this._cro.next(cro);

                // Return the cro
                return cro;
            }),
            switchMap((cro) => {
                if (!cro) {
                    return throwError(
                        'Could not found cro with oid of ' + oid + '!'
                    );
                }

                return of(cro);
            })
        );
    }

    /**
     * Create cro
     */
    createCro(): Observable<Cro> {
        return this.cros$.pipe(
            take(1),
            switchMap((cros) =>
                this._httpClient
                    .post<Cro>('api/apps/cros/cro', {})
                    .pipe(
                        map((newCro) => {
                            // Update the cros with the new cro
                            this._cros.next([newCro, ...cros]);

                            // Return the new cro
                            return newCro;
                        })
                    )
            )
        );
    }

    /**
     * Update cro
     *
     * @param oid
     * @param cro
     */
    updateCro(oid: string, cro: Cro): Observable<Cro> {
        return this.cros$.pipe(
            take(1),
            switchMap((cros) =>
                this._httpClient
                    .patch<Cro>('api/apps/cros/cro', {
                        oid,
                        cro,
                    })
                    .pipe(
                        map((updatedCro) => {
                            // Find the index of the updated cro
                            const index = cros.findIndex(
                                (item) => item.oid === oid
                            );

                            // Update the cro
                            cros[index] = updatedCro;

                            // Update the cros
                            this._cros.next(cros);

                            // Return the updated cro
                            return updatedCro;
                        }),
                        switchMap((updatedCro) =>
                            this.cro$.pipe(
                                take(1),
                                filter((item) => item && item.oid === oid),
                                tap(() => {
                                    // Update the cro if it's selected
                                    this._cro.next(updatedCro);

                                    // Return the updated cro
                                    return updatedCro;
                                })
                            )
                        )
                    )
            )
        );
    }

    /**
     * Delete the cro
     *
     * @param id
     */
    deleteCro(oid: string): Observable<boolean> {
        return this.cros$.pipe(
            take(1),
            switchMap((cros) =>
                this._httpClient
                    .delete('api/apps/cros/cro', { params: { oid } })
                    .pipe(
                        map((isDeleted: boolean) => {
                            // Find the index of the deleted cro
                            const index = cros.findIndex(
                                (item) => item.oid === oid
                            );

                            // Delete the cro
                            cros.splice(index, 1);

                            // Update the cros
                            this._cros.next(cros);

                            // Return the deleted status
                            return isDeleted;
                        })
                    )
            )
        );
    }

}
