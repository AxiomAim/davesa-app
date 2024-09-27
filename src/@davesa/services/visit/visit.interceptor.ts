import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, finalize, take } from 'rxjs';
import { DavesaVisitService } from './visit.service';

export const davesaVisitInterceptor = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const davesaVisitService = inject(DavesaVisitService);
    let handleRequestsParticipant = null;

    davesaVisitService.participant$.pipe(take(1)).subscribe((value) => {
        handleRequestsParticipant = value;
    });

    // If the Auto mode is turned off, do nothing
    if (!handleRequestsParticipant) {
        return next(req);
    }

    // Set the loading status to true
    davesaVisitService._setVisitStatus(true, req.url);

    return next(req).pipe(
        finalize(() => {
            // Set the status to false if there are any errors or the request is completed
            davesaVisitService._setVisitStatus(false, req.url);
        })
    );
};
