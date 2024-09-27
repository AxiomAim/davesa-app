import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Study } from 'app/core/interfaces/study.interface';
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
import { StudyConstructorV2Service } from 'app/core/services/study-constructor-v2.service';
@Injectable(
    { 
        providedIn: 'root'
    }
)
export class StudyConstructorService implements SortByFieldPipe{
    private _studyConstructorV2Service = inject(StudyConstructorV2Service);

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
      
    studyFilterParamsData: FilterParams = {
        offset: 0,
        limit: 25,
        sort_field: "created_at",
        sort_direction: "D",
        query: "",
        site_account_id: null,
        module_type: "study_builder",
        type: "global",
      };
    
      filteredStudies: any[];


    // Private
    private _study: BehaviorSubject<Study | null> = new BehaviorSubject(
        null
    );
    private _studies: BehaviorSubject<Study[] | null> = new BehaviorSubject(
        null
    );
    private _allStudies: BehaviorSubject<Study[] | null> = new BehaviorSubject(
        null
    );

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for study
     */
    get study$(): Observable<Study> {
        return this._study.asObservable();
    }

    /**
     * Getter for studies
     */
    get studies$(): Observable<Study[]> {
        return this._studies.asObservable();
    }

    get allStudies$(): Observable<Study[]> {
        return this._studies.asObservable();
    }

    /**
     * Get studies
     */
    getStudies(): Observable<any[]> {
        return this._studyConstructorV2Service
        .getStudyList(this.studyFilterParamsData)
        .pipe(tap((res: any) => {
            console.log('studies', res.data)
          if (res.data) {
            this._studies.next(res.data);
            this._allStudies.next(res.data);
          }
        }));
    }


    getStudy(): Observable<any> {
        const study = this._studyConstructorV2Service.study()
        if(study) {
            this._study.next(study);
            return of(study)        
        } else {
            this._study.next(null);
            return of(null)        
        }
    }

    /**
     * Get study by id
     */
    getStudyById(oid: string): Observable<Study> {
        console.log('getStudyById', oid)
        if(oid = '00000000-0000-0000-0000-000000000000') {
            const newStudy = this._studyConstructorV2Service.getEmptyStudy()
            const myStudy = this._studyConstructorV2Service.study();
            console.log('myStudy', myStudy)
            this._study.next(this._studyConstructorV2Service.study());
            return of(this._studyConstructorV2Service.study());
        } else {
            return this._studies.pipe(
                take(1),
                map((studies) => {
                    // Find the study
                    const study = studies.find((item) => item.oid === oid) || null;
                    console.log('study', study)
                    // Update the study
                    this._study.next(study);
                    // Return the study
                    return study;
                }),
                switchMap((study) => {
                    if (!study) {
                        return throwError(
                            'Could not found study with oid of ' + oid + '!'
                        );
                    }
                    return of(study);
                })
            );
        }
    }

    /**
     * Search studies with given query
     *
     * @param query
     */
    searchStudies(query: string): Observable<Study[]> {
        let studies = cloneDeep(this._studies);
        studies.pipe(
            take(1),
            map((studies) => {
                const searchResults = studies.filter(
                    (results) =>
                    results.number.toLowerCase().includes(query.toLowerCase())
                );
                this._studies.next(searchResults);
            }),
            switchMap((studies) => {
                if (!this.filteredStudies) {
                    return throwError(
                        'Could not found study with Study Number of ' + query + '!'
                    );
                }
            })
        );
        
        return this._studies.pipe(
            take(1),
            map((studies) => {
                const searchResults = studies.filter((results) =>
                    results.number.toLowerCase().includes(query.toLowerCase())
                );
                console.log('searchResults', searchResults)
                this._studies.next(searchResults);
            }),
            switchMap((studies) => {
                if (!this.filteredStudies) {
                    return throwError(
                        'Could not found study with Subject Number of ' + query + '!'
                    );
                }
            })
        );
    }




    /**
     * Create study
     */
    createStudy(): Observable<Study> {
        const newStudy = this._studyConstructorV2Service.getEmptyStudy()
        return of(this._studyConstructorV2Service.study())
    }

    /**
     * Update study
     *
     * @param id
     * @param study
     */
    updateStudy(oid: string, study: Study): Observable<Study> {
        return this.studies$.pipe(
            take(1),
            switchMap((studies) =>
                this._httpClient
                    .patch<Study>('api/apps/studies/study', {
                        oid,
                        study,
                    })
                    .pipe(
                        map((updatedStudy) => {
                            // Find the index of the updated study
                            const index = studies.findIndex(
                                (item) => item.oid === oid
                            );

                            // Update the study
                            studies[index] = updatedStudy;

                            // Update the studies
                            this._studies.next(studies);

                            // Return the updated study
                            return updatedStudy;
                        }),
                        switchMap((updatedStudy) =>
                            this.study$.pipe(
                                take(1),
                                filter((item) => item && item.oid === oid),
                                tap(() => {
                                    // Update the study if it's selected
                                    this._study.next(updatedStudy);

                                    // Return the updated study
                                    return updatedStudy;
                                })
                            )
                        )
                    )
            )
        );
    }
    
    /**
     * Delete the study
     *
     * @param id
     */
    deleteStudy(oid: string): Observable<boolean> {
        return this.studies$.pipe(
            take(1),
            switchMap((studies) =>
                this._httpClient
                    .delete('api/apps/studies/study', { params: { oid } })
                    .pipe(
                        map((isDeleted: boolean) => {
                            // Find the index of the deleted study
                            const index = studies.findIndex(
                                (item) => item.oid === oid
                            );

                            // Delete the study
                            studies.splice(index, 1);

                            // Update the studies
                            this._studies.next(studies);

                            // Return the deleted status
                            return isDeleted;
                        })
                    )
            )
        );
    }


}
