import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';

export const NoAuthDavesaGuard: CanActivateFn | CanActivateChildFn = (
    route,
    state
) => {
    // const _router: Router = inject(Router);
    // const tokenKey = inject(TokenDavesaService).getToken();
    // const router: Router = inject(Router);

    // if (tokenKey) { 
    //   return of(router.parseUrl(''));
    // } else { 
      return of(true);
    // } 
};