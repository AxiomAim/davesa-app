import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Participant } from 'app/core/interfaces/participant.interface';
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
import moment from "moment";
import { SortByFieldPipe } from '@davesa/pipes/sortByField.pipe';
import { cloneDeep } from 'lodash';
import { ParticipantsV2Service } from 'app/core/services/participants-v2.service';
import { VisitsV2Service } from 'app/core/services/visits-v2.services';
import { Visit } from 'app/core/interfaces/visit.interface';
@Injectable(
    { 
        providedIn: 'root'
    }
)
export class ParticipantsService implements SortByFieldPipe{
    private _visitsV2Service = inject(VisitsV2Service);
    private _participantsV2Service = inject(ParticipantsV2Service);
    private _visists2Service = inject(VisitsV2Service);
    private _httpClient = inject(HttpClient);

    transform(array: any, field: string): any[] {
        if (!Array.isArray(array)) {
          return;
        }
        array.sort((a: any, b: any) => {
          if (a[field] < b[field]) {
            return -1;
          } else if (a[field] > b[field]) {
            return 1;
          } else {
            return 0;
          }
        });
        return array;
    }

    filterParticipantsParamsData: FilterParams = {
        offset: 0,
        limit: 1000,
        sort_field: "created_at",
        sort_direction: "D",
        query: "",
        site_account_id: null,
      };

      filteredParticipants: any[];

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
    


    // private _participantsV2Service = inject(SubjectService);
    // Private
    private _participant: BehaviorSubject<Participant | null> = new BehaviorSubject(
        null
    );
    private _participants: BehaviorSubject<Participant[] | null> = new BehaviorSubject(
        null
    );
    private _visits: BehaviorSubject<Visit[] | null> = new BehaviorSubject(
        null
    );
    private _visitStatus: BehaviorSubject<any | null> = new BehaviorSubject(
        null
    );
    // private _countries: BehaviorSubject<Country[] | null> = new BehaviorSubject(
    //     null
    // );
    // private _tags: BehaviorSubject<Tag[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(

    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for participant
     */
    get participant$(): Observable<Participant> {
        return this._participant.asObservable();
    }

    /**
     * Getter for participants
     */
    get participants$(): Observable<Participant[]> {
        return this._participants.asObservable();
    }

    get visits$(): Observable<Visit[]> {
        return this._visits.asObservable();
    }

    get visitStatus$(): Observable<any> {
        return this._visitStatus.asObservable();
    }

    /**
     * Get participants
     */
    getAll(): Observable<any[]> {
        this.getVisitStatus().subscribe((visitStatus) => {
            this._visitsV2Service.setVisitStatus(visitStatus)
            this._visitsV2Service.setToStorage()
            this._visitStatus.next(visitStatus);
        })

        return this._participantsV2Service
        .getAll(this.filterParticipantsParamsData)
        .pipe(tap((res: any) => {
          if (res.data) {
            const rows = res.data.map((data) => {
              let appointment_start_date =
                data.subject_visits &&
                data?.subject_visits[0]?.appointment_start_date &&
                moment(data?.subject_visits[0]?.appointment_start_date).format(
                  "M/D/YY h:mm a"
                );
              let appointment_status =
                data?.subject_visits && data?.subject_visits[0]?.status;
              return {
                ...data,
                appointment_start_date,
                appointment_status,
                study_number: data?.study?.number,
                subject_id: String(data?.subject_id),
              };
            });
            const sortedRows = this.transform(rows, 'study_number');

            this._participants.next(rows);
            this.setParticipants(rows);

          }
        }));

    }

    
    setParticipants(data: any) {
        this._participantsV2Service.setParticipants(data);
    }

    getItem(): Observable<any> {
        const participant =  this._participantsV2Service.participant()
        this._participant.next(participant);
        return of(participant)    
    }

    /**
     * Get participant by id
     */
    getByOid(oid: string): Observable<any> {
        return this._participants.pipe(
               switchMap((participants: any) => {
                // Find the participant
                const participant = participants.find((item) => item.oid === oid) || null;
                // Update the participant
                this.setParticipant(participant);
                this._participant.next(participant);                
                if (!participant) {
                    return throwError(
                        'Could not found participant with oid of ' + oid + '!'
                    );
                } else {
                    this.setParticipant(participant);
                    return this.getAllVisits().pipe(map((res: any) => {
                        this._visits.next(res.data.data)
                        return of(participant);
                    }));
                }
            })
        );
    }

    setParticipant(participant: any) {
        this._participantsV2Service.setParticipant(participant);
        this._participantsV2Service.setToStorage()
        this._participantsV2Service.setToStorage()
        this._visitsV2Service.setStudyOid(participant.study.oid)
        this._visitsV2Service.setParticipant(participant)
        this._visitsV2Service.setToStorage()
    }

    getAllVisits(): Observable<Visit[]> {
        this._visists2Service.loadFromStorage()
        const participant = this._participantsV2Service.participant()
        this._participant.next(participant)
        this.filterVisitsParamsData.subject_oid = participant.oid;
        return this._visists2Service
        .getAll(this.filterVisitsParamsData)
        .pipe(tap((res: any) => {
            const visits = res.data.data;
            this._visists2Service.setVisits(visits)
            this._visists2Service.setToStorage()
            this._visits.next(visits);
        }));
    }

    
    getById(oid: string): Observable<Participant> {
        return this._participantsV2Service
        .getByOid(oid)
        .pipe(tap((res: any) => {
          if (res.data) {
            this._participant.next(res.data);
          }
        }));
    }

    /**
     * Search participants with given query
     *
     * @param query
     */
    // searchParticipants(query: string): Observable<Participant[]> {
    //     return this._httpClient
    //         .get<Participant[]>('api/apps/participants/search', {
    //             params: { query },
    //         })
    //         .pipe(
    //             tap((participants) => {
    //                 this._participants.next(participants);
    //             })
    //         );
    // }

    // this._davesaMockApiService
    // .onGet('api/apps/participants/search')
    // .reply(({ request }) => {
    //     // Get the search query
    //     const query = request.params.get('query');

    //     // Clone the participants
    //     let participants = cloneDeep(this._participants);

    //     // If the query exists...
    //     if (query) {
    //         // Filter the participants
    //         participants = participants.filter(
    //             (participant) =>
    //                 participant.subject_id &&
    //                 participant.subject_id
    //                     .toLowerCase()
    //                     .includes(query.toLowerCase())
    //         );
    //     }

    //     // Sort the participants by the subject_id field by default
    //     participants.sort((a, b) => a.subject_id.localeCompare(b.subject_id));

    //     // Return the response
    //     return [200, participants];
    // });


    search(query: string): Observable<Participant[]> {
        let currentParticipants: Participant[] = this._participants.getValue();
        // If the query exists...
            if(query.length > 0) {
                // Filter the users
                let participants = currentParticipants.filter((participant: any) =>
                    participant.subject_id && participant.subject_id.toLowerCase().includes(query.toLowerCase())
                );
                currentParticipants.sort((a:any, b:any) => a.subject_id.localeCompare(b.subject_id));
                // notify subscribers with new users list
                this._participants.next(participants);
                
                return of(participants);
            } else {
                    this._participants.next(currentParticipants);
                    return of(currentParticipants);                
            }
        }

    searchParticipants(query: string): Observable<Participant> {
        let participants = cloneDeep(this._participants);

        participants.pipe(
            tap((participants) => {
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

                this._participants.next(participants);
                return of(participants)
            })
        );
        return of(null)
            
    }

    
    /**
     * Create participant
     */
    createParticipant(): Observable<Participant> {
        return this.participants$.pipe(
            take(1),
            switchMap((participants) =>
                this._httpClient
                    .post<Participant>('api/apps/participants/participant', {})
                    .pipe(
                        map((newParticipant) => {
                            // Update the participants with the new participant
                            this._participants.next([newParticipant, ...participants]);

                            // Return the new participant
                            return newParticipant;
                        })
                    )
            )
        );
    }

    /**
     * Update participant
     *
     * @param id
     * @param participant
     */
    updateParticipant(oid: string, participant: Participant): Observable<Participant> {
        return this.participants$.pipe(
            take(1),
            switchMap((participants) =>
                this._httpClient
                    .patch<Participant>('api/apps/participants/participant', {
                        oid,
                        participant,
                    })
                    .pipe(
                        map((updatedParticipant) => {
                            // Find the index of the updated participant
                            const index = participants.findIndex(
                                (item) => item.oid === oid
                            );

                            // Update the participant
                            participants[index] = updatedParticipant;

                            // Update the participants
                            this._participants.next(participants);

                            // Return the updated participant
                            return updatedParticipant;
                        }),
                        switchMap((updatedParticipant) =>
                            this.participant$.pipe(
                                take(1),
                                filter((item) => item && item.oid === oid),
                                tap(() => {
                                    // Update the participant if it's selected
                                    this._participant.next(updatedParticipant);

                                    // Return the updated participant
                                    return updatedParticipant;
                                })
                            )
                        )
                    )
            )
        );
    }


    /**
     * Delete the participant
     *
     * @param id
     */
    deleteParticipant(oid: string): Observable<boolean> {
        return this.participants$.pipe(
            take(1),
            switchMap((participants) =>
                this._httpClient
                    .delete('api/apps/participants/participant', { params: { oid } })
                    .pipe(
                        map((isDeleted: boolean) => {
                            // Find the index of the deleted participant
                            const index = participants.findIndex(
                                (item) => item.oid === oid
                            );

                            // Delete the participant
                            participants.splice(index, 1);

                            // Update the participants
                            this._participants.next(participants);

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
