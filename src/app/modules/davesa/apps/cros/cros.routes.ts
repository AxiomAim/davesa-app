import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { CrosComponent } from 'app/modules/davesa/apps/cros/cros.component';
import { CrosService } from 'app/modules/davesa/apps/cros/cros.service';
import { CrosDetailsComponent } from 'app/modules/davesa/apps/cros/details/details.component';
import { CrosListComponent } from 'app/modules/davesa/apps/cros/list/list.component';
import { catchError, throwError } from 'rxjs';

/**
 * Cro resolver
 *
 * @param route
 * @param state
 */
const croResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const crosService = inject(CrosService);
    const router = inject(Router);

    return crosService.getCroById(route.paramMap.get('oid')).pipe(
        // Error here means the requested cro is not available
        catchError((error) => {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
        })
    );
};

/**
 * Can deactivate cros details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivateCrosDetails = (
    component: CrosDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/cros'
    // it means we are navigating away from the
    // cros app
    if (!nextState.url.includes('/cros')) {
        // Let it navigate
        return true;
    }

    // If we are navigating to another cro...
    if (nextRoute.paramMap.get('oid')) {
        // Just navigate
        return true;
    }

    // Otherwise, close the drawer first, and then navigate
    return component.closeDrawer().then(() => true);
};

export default [
    {
        path: '',
        component: CrosComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: CrosListComponent,
                resolve: {
                    cros: () => inject(CrosService).getCros(),
                },
                children: [
                    {
                        path: ':oid',
                        component: CrosDetailsComponent,
                        resolve: {
                            cro: croResolver,
                        },
                        canDeactivate: [canDeactivateCrosDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
