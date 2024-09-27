import { Injectable } from '@angular/core';
import { Participant } from 'app/core/interfaces/participant.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DavesaVisitService {

    private _participant$: BehaviorSubject<Participant> = new BehaviorSubject<Participant>(
        null
    );

    private _urlMap: Map<string, boolean> = new Map<string, boolean>();

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for participant
     */
    get participant$(): Observable<Participant> {
        return this._participant$.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Participant the visit bar
     */
    setParticipant(data: Participant): void {
        this._participant$.next(data);
        
    }


    /**
     * Sets the visit status on the given url
     *
     * @param status
     * @param url
     */
    _setVisitStatus(status: boolean, url: string): void {
        // Return if the url was not provided
        if (!url) {
            console.error('The request URL must be provided!');
            return;
        }

        if (status === true) {
            this._urlMap.set(url, status);
        } else if (status === false && this._urlMap.has(url)) {
            this._urlMap.delete(url);
        }

        // Only set the status to 'false' if all outgoing requests are completed
        if (this._urlMap.size === 0) {

        }
    }
}
