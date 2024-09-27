import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { DavesaLoadingService } from '@davesa/services/loading/loading.service';
import { Observable, finalize, take } from 'rxjs';

export const davesaLoadingInterceptor = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const davesaLoadingService = inject(DavesaLoadingService);
    let handleRequestsAutomatically = false;

    davesaLoadingService.auto$.pipe(take(1)).subscribe((value) => {
        handleRequestsAutomatically = value;
    });

    // If the Auto mode is turned off, do nothing
    if (!handleRequestsAutomatically) {
        return next(req);
    }

    // Set the loading status to true
    davesaLoadingService._setLoadingStatus(true, req.url);

    return next(req).pipe(
        finalize(() => {
            // Set the status to false if there are any errors or the request is completed
            davesaLoadingService._setLoadingStatus(false, req.url);
        })
    );
};
