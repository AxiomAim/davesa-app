import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { IrbsComponent } from 'app/modules/davesa/apps/irbs/irbs.component';
import { IrbsService } from 'app/modules/davesa/apps/irbs/irbs.service';
import { IrbsDetailsComponent } from 'app/modules/davesa/apps/irbs/details/details.component';
import { IrbsListComponent } from 'app/modules/davesa/apps/irbs/list/list.component';
import { catchError, throwError } from 'rxjs';

/**
 * Irb resolver
 *
 * @param route
 * @param state
 */
const irbResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const irbsService = inject(IrbsService);
    const router = inject(Router);

    return irbsService.getIrbById(route.paramMap.get('oid')).pipe(
        // Error here means the requested irb is not available
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
 * Can deactivate irbs details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivateIrbsDetails = (
    component: IrbsDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/irbs'
    // it means we are navigating away from the
    // irbs app
    if (!nextState.url.includes('/irbs')) {
        // Let it navigate
        return true;
    }

    // If we are navigating to another irb...
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
        component: IrbsComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: IrbsListComponent,
                resolve: {
                    irbs: () => inject(IrbsService).getIrbs(),
                },
                children: [
                    {
                        path: ':oid',
                        component: IrbsDetailsComponent,
                        resolve: {
                            irb: irbResolver,
                        },
                        canDeactivate: [canDeactivateIrbsDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
