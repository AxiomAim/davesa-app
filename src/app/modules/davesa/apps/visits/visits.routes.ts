import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { VisitsService } from './visits.service';
import { VisitsDetailsComponent } from './details/details.component';
import { VisitsComponent } from './visits.component';
import { VisitsListComponent } from './list/list.component';

/**
 * Visit resolver
 *
 * @param route
 * @param state
 */
const participantResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const visitsService = inject(VisitsService);
    const router = inject(Router);

    return visitsService.getByOId(route.paramMap.get('participantOid')).pipe(
        // Error here means the requested visit is not available
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

const visitResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const visitsService = inject(VisitsService);
    const router = inject(Router);

    return visitsService.getByOId(route.paramMap.get('oid')).pipe(
        // Error here means the requested visit is not available
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
 * Can deactivate visits details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivateVisitsDetails = (
    component: VisitsDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/visits'
    // it means we are navigating away from the
    // visits app
    if (!nextState.url.includes('/visits')) {
        // Let it navigate
        return true;
    }

    // If we are navigating to another visit...
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
        component: VisitsComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: VisitsListComponent,
                resolve: {
                    visits: () => inject(VisitsService).getAll(),
                },
                children: [
                    {
                        path: ':oid',
                        component: VisitsDetailsComponent,
                        resolve: {
                            visit: visitResolver,
                        },
                        canDeactivate: [canDeactivateVisitsDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
