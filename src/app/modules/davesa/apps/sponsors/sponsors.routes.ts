import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { SponsorsComponent } from 'app/modules/davesa/apps/sponsors/sponsors.component';
import { SponsorsService } from 'app/modules/davesa/apps/sponsors/sponsors.service';
import { SponsorsDetailsComponent } from 'app/modules/davesa/apps/sponsors/details/details.component';
import { SponsorsListComponent } from 'app/modules/davesa/apps/sponsors/list/list.component';
import { catchError, throwError } from 'rxjs';

/**
 * Sponsor resolver
 *
 * @param route
 * @param state
 */
const sponsorResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const sponsorsService = inject(SponsorsService);
    const router = inject(Router);

    return sponsorsService.getSponsorById(route.paramMap.get('oid')).pipe(
        // Error here means the requested sponsor is not available
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
 * Can deactivate sponsors details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivateSponsorsDetails = (
    component: SponsorsDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/sponsors'
    // it means we are navigating away from the
    // sponsors app
    if (!nextState.url.includes('/sponsors')) {
        // Let it navigate
        return true;
    }

    // If we are navigating to another sponsor...
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
        component: SponsorsComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: SponsorsListComponent,
                resolve: {
                    sponsors: () => inject(SponsorsService).getSponsors(),
                },
                children: [
                    {
                        path: ':oid',
                        component: SponsorsDetailsComponent,
                        resolve: {
                            sponsor: sponsorResolver,
                        },
                        canDeactivate: [canDeactivateSponsorsDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
