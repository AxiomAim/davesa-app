import {
  HttpContext,
    HttpContextToken,
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpHeaders,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from "../../../environments/environment";

import { Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertMessagesService } from '@davesa/components/alert-messages/alert-messages.service';
import { AuthDavesaApiService } from './auth-davesa-api.service';

const TOKEN_HEADER_KEY = "x-access-token"; // for Node.js Express back-end
export const DAVESA_AUTH_API = new HttpContextToken(() => false);

/**
 * Interceptor
 *
 * @param req
 * @param next
 */
export const authDavesaApiInterceptor = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  if(req.context.get(DAVESA_AUTH_API)) {
    const _alertMessagesService = inject(AlertMessagesService);
    const _authDavesaApiService = inject(AuthDavesaApiService);
    const token = _authDavesaApiService.token();
    const domain = _authDavesaApiService.orgDomain();
    const _router = inject(Router);
    const { hostname } = new URL(window.location.href);
    const url = environment.API_URL + req.urlWithParams;
    let authReq;

    authReq = req.clone({
      url: environment.API_URL + req.urlWithParams,
    });
      if (domain) {
        authReq = authReq.clone({
          url: url,
          setHeaders: { domain: domain },
        });
      } 
      if(token) {
        authReq = authReq.clone({
          url: url,
          setHeaders: { domain: domain, "x-access-token": token },
        });
      }
    // }
    return next(authReq).pipe(
        map((event: HttpEvent<unknown>) => {
          // if (event instanceof HttpResponse) {
          //   // this._broadcasterService.spinner(false);
          // }
          return event;
        }),
        catchError((error) => {
          if (error) {
            _alertMessagesService.showMessage(`${error.status}: ${error.error.error}`, 'warn')
            switch (error.status) {
              case 0:
                // this._dialog.closeAll();
                // this._snackbarService.error("Request cannot be processed");
                _authDavesaApiService.token();
                _router.navigateByUrl("/sign-in");
                break;
              case 400:
                if (error.error?.validation) {
                //   this._snackbarService.error(
                //     error.error?.validation?.body?.message
                //   );
                } else {
                //   this._snackbarService.error(error.error.error);
                }
                break;
              case 401:
                const oldToken = _authDavesaApiService.token();
                if (oldToken) {
                  return _authDavesaApiService.refreshAuthToken(oldToken).pipe(
                    switchMap((res) => {
                      authReq = authReq.clone({
                        headers: authReq.headers.set("x-access-token", res.data.token),
                      });
                      return next(authReq);
                    }),
                    catchError((err) => {
                      _authDavesaApiService.removeFromStorage();
                      _router.navigateByUrl('/');
                      return of(null);
                    })
                  );  

                }
              case 404:
                break;
  
              case 500:
                // this._snackbarService.error("Interval server error.");
                break;
  
              case 299:
                // this._snackbarService.warning(null);
  
              default:
                break;
            }
            // if (spinner) {
            //   this._broadcasterService.spinner(false);
            // }
          }
          // throw new Error(error);
          return throwError(error);
        })
      );
  
        // return next(authReq).pipe(
        //     catchError((error) => {
        //         // Catch "401 Unauthorized" responses
        //         if (error instanceof HttpErrorResponse && error.status === 401) {
        //             // Sign out
        //             _authDavesaService.signOut();

        //             // Reload the app
        //             location.reload();
        //         }

        //         return throwError(error);
        //     })
        // );
  } else {  
    return next(req);
  }

};
