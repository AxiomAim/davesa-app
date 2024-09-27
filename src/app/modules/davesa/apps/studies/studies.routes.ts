import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { StudiesComponent } from 'app/modules/davesa/apps/studies/studies.component';
import { StudiesService } from 'app/modules/davesa/apps/studies/studies.service';
import { StudiesDetailsComponent } from 'app/modules/davesa/apps/studies/details/details.component';
import { StudiesListComponent } from 'app/modules/davesa/apps/studies/list/list.component';
import { catchError, throwError } from 'rxjs';

/**
 * Study resolver
 *
 * @param route
 * @param state
 */
const studyResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const studiesService = inject(StudiesService);
    const router = inject(Router);

    return studiesService.getById(route.paramMap.get('oid')).pipe(
        // Error here means the requested study is not available
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
 * Can deactivate studies details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivateStudiesDetails = (
    component: StudiesDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/studies'
    // it means we are navigating away from the
    // studies app
    if (!nextState.url.includes('/studies')) {
        // Let it navigate
        return true;
    }

    // If we are navigating to another study...
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
        component: StudiesComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: StudiesListComponent,
                resolve: {
                    studies: () => inject(StudiesService).getAll(),
                },
                children: [
                    {
                        path: ':oid',
                        component: StudiesDetailsComponent,
                        resolve: {
                            study: studyResolver,
                        },
                        canDeactivate: [canDeactivateStudiesDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
