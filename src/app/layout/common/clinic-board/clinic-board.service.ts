import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Participant } from 'app/core/interfaces/participant.interface';
import { Study } from 'app/core/interfaces/study.interface';
import { Visit } from 'app/core/interfaces/visit.interface';
import { ParticipantsV2Service } from 'app/core/services/participants-v2.service';
import { VisitsV2Service } from 'app/core/services/visits-v2.services';
import { FilterParams } from 'app/core/types/filter-params.type';
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
export class ClinicBoardService {
    private _participantsV2Service = inject(ParticipantsV2Service);
    private _visists2Service = inject(VisitsV2Service);
    
    filterVisitsParamsData = {
        visitOffset: 0,
        visitLimit: 10,
        offset: 0,
        procedureOffset: 0,
        procedureLimit: 10,
        sort_field: "visit_type",
        sort_direction: "A",
        query: "",
        subject_oid: "",
      };

    filterClinicBoardParamsData: FilterParams = {
        offset: 0,
        limit: 0,
        sort_field: "created_at",
        sort_direction: "D",
        query: "",
      };
    
    
    
    // Private
    private _study: BehaviorSubject<Study | null> = new BehaviorSubject(
        null
    );

    private _participant: BehaviorSubject<Participant | null> = new BehaviorSubject(
        null
    );

    private _visit: BehaviorSubject<Visit | null> = new BehaviorSubject(
        null
    );
    private _visits: BehaviorSubject<Visit[] | null> = new BehaviorSubject(
        null
    );
    private _visitStatus: BehaviorSubject<any[] | null> = new BehaviorSubject(
        null
    );
    public _clinicBoard: BehaviorSubject<any[] | null> = new BehaviorSubject(
        null
    );


    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    get study$(): Observable<Study> {
        return this._study.asObservable();
    }

    get participant$(): Observable<Participant> {
        return this._participant.asObservable();
    }

    /**
     * Getter for visit
     */
    get visit$(): Observable<Visit> {
        return this._visit.asObservable();
    }

    get visitStatus$(): Observable<any[]> {
        return this._visitStatus.asObservable();
    }

    /**
     * Getter for visits
     */
    get visits$(): Observable<Visit[]> {
        return this._visits.asObservable();
    }

    get clinicBoard$(): Observable<Participant[]> {
        return this._clinicBoard.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    getClinicBoard(): Observable<Visit[]> {
        return this._visists2Service.getClinicBoard(this.filterClinicBoardParamsData).pipe(tap((res: any) => {
            this._clinicBoard.next(res.data);
        }));   
    }


    /**
     * Search visits with given query
     *
     * @param query
     */
    searchVisits(query: string): Observable<Visit[]> {
        return this._httpClient
            .get<Visit[]>('api/apps/visits/search', {
                params: { query },
            })
            .pipe(
                tap((visits) => {
                    this._visits.next(visits);
                })
            );
    }

    /**
     * Get visit by oid
     */
    getByOId(oid: string): Observable<Visit> {
        return this._visits.pipe(
            take(1),
            map((visits) => {
                // Find the visit
                const visit = visits.find((item) => item.oid === oid) || null;

                // Update the visit
                this._visists2Service.setVisit(visit)
                this._visists2Service.setToStorage()                
                this._visit.next(visit);

                // Return the visit
                return visit;
            }),
            switchMap((visit) => {
                if (!visit) {
                    return throwError(
                        'Could not found visit with oid of ' + oid + '!'
                    );
                }

                return of(visit);
            })
        );
    }

    getStudyByOId(oid: string): Observable<Study> {
        return this._visists2Service
        .getByOid(oid)
        .pipe(tap((res: any) => {
            this._study.next(res.data);
        }));
    }

    
    /**
     * Create visit
     */
    createVisit(): Observable<Visit> {
        return this.visits$.pipe(
            take(1),
            switchMap((visits) =>
                this._httpClient
                    .post<Visit>('api/apps/visits/visit', {})
                    .pipe(
                        map((newVisit) => {
                            // Update the visits with the new visit
                            this._visits.next([newVisit, ...visits]);

                            // Return the new visit
                            return newVisit;
                        })
                    )
            )
        );
    }

    /**
     * Update visit
     *
     * @param oid
     * @param visit
     */
    updateVisit(oid: string, visit: Visit): Observable<Visit> {
        return this.visits$.pipe(
            take(1),
            switchMap((visits) =>
                this._httpClient
                    .patch<Visit>('api/apps/visits/visit', {
                        oid,
                        visit,
                    })
                    .pipe(
                        map((updatedVisit) => {
                            // Find the index of the updated visit
                            const index = visits.findIndex(
                                (item) => item.oid === oid
                            );

                            // Update the visit
                            visits[index] = updatedVisit;

                            // Update the visits
                            this._visits.next(visits);

                            // Return the updated visit
                            return updatedVisit;
                        }),
                        switchMap((updatedVisit) =>
                            this.visit$.pipe(
                                take(1),
                                filter((item) => item && item.oid === oid),
                                tap(() => {
                                    // Update the visit if it's selected
                                    this._visit.next(updatedVisit);

                                    // Return the updated visit
                                    return updatedVisit;
                                })
                            )
                        )
                    )
            )
        );
    }

    /**
     * Delete the visit
     *
     * @param id
     */
    deleteVisit(oid: string): Observable<boolean> {
        return this.visits$.pipe(
            take(1),
            switchMap((visits) =>
                this._httpClient
                    .delete('api/apps/visits/visit', { params: { oid } })
                    .pipe(
                        map((isDeleted: boolean) => {
                            // Find the index of the deleted visit
                            const index = visits.findIndex(
                                (item) => item.oid === oid
                            );

                            // Delete the visit
                            visits.splice(index, 1);

                            // Update the visits
                            this._visits.next(visits);

                            // Return the deleted status
                            return isDeleted;
                        })
                    )
            )
        );
    }

    getVisitStatus(): Observable<any[]> {
        return this._httpClient.get<any>('api/common/visit-status/all').pipe(
            tap((visitStatus) => {
                this._visitStatus.next(visitStatus);
                return of(visitStatus);
            })
        );
    }


}
