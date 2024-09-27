import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
    UrlMatchResult,
    UrlSegment,
} from '@angular/router';
import { CommunicationsDetailsComponent } from 'app/modules/davesa/apps/participants/communications/details/details.component';
import { CommunicationsEmptyDetailsComponent } from 'app/modules/davesa/apps/participants/communications/empty-details/empty-details.component';
import { CommunicationsListComponent } from 'app/modules/davesa/apps/participants/communications/list/list.component';
import { CommunicationsComponent } from 'app/modules/davesa/apps/participants/communications/communications.component';
import { CommunicationsService } from 'app/modules/davesa/apps/participants/communications/communications.service';
import { CommunicationsSettingsComponent } from 'app/modules/davesa/apps/participants/communications/settings/settings.component';
import { isEqual } from 'lodash-es';
import { catchError, finalize, forkJoin, throwError } from 'rxjs';

/**
 * Communications custom route matcher
 *
 * @param url
 */
const communicationsRouteMatcher: (url: UrlSegment[]) => UrlMatchResult = (
    url: UrlSegment[]
) => {
    // Prepare consumed url and positional parameters
    let consumed = url;
    const posParams = {};

    // Settings
    if (url[0].path === 'settings') {
        // Do not match
        return null;
    }
    // Filter or label
    else if (url[0].path === 'filter' || url[0].path === 'label') {
        posParams[url[0].path] = url[1];
        posParams['page'] = url[2];

        // Remove the id if exists
        if (url[3]) {
            consumed = url.slice(0, -1);
        }
    }
    // Folder
    else {
        posParams['folder'] = url[0];
        posParams['page'] = url[1];

        // Remove the id if exists
        if (url[2]) {
            consumed = url.slice(0, -1);
        }
    }

    return {
        consumed,
        posParams,
    };
};

/**
 * Communications custom guards and resolvers runner
 *
 * @param from
 * @param to
 */
const communicationsRunGuardsAndResolvers: (
    from: ActivatedRouteSnapshot,
    to: ActivatedRouteSnapshot
) => boolean = (from: ActivatedRouteSnapshot, to: ActivatedRouteSnapshot) => {
    // If we are navigating from communication to communications, meaning there is an id in
    // from's deepest first child and there isn't one in the to's, we will
    // trigger the resolver

    // Get the current activated route of the 'from'
    let fromCurrentRoute = from;
    while (fromCurrentRoute.firstChild) {
        fromCurrentRoute = fromCurrentRoute.firstChild;
    }

    // Get the current activated route of the 'to'
    let toCurrentRoute = to;
    while (toCurrentRoute.firstChild) {
        toCurrentRoute = toCurrentRoute.firstChild;
    }

    // Trigger the resolver if the condition met
    if (
        fromCurrentRoute.paramMap.get('id') &&
        !toCurrentRoute.paramMap.get('id')
    ) {
        return true;
    }

    // If the from and to params are equal, don't trigger the resolver
    const fromParams = {};
    const toParams = {};

    from.paramMap.keys.forEach((key) => {
        fromParams[key] = from.paramMap.get(key);
    });

    to.paramMap.keys.forEach((key) => {
        toParams[key] = to.paramMap.get(key);
    });

    if (isEqual(fromParams, toParams)) {
        return false;
    }

    // Trigger the resolver on other cases
    return true;
};

/**
 * Communications resolver
 *
 * @param route
 * @param state
 */
const communicationsResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const communicationsService = inject(CommunicationsService);
    const router = inject(Router);

    // Don't allow page param to go below 1
    if (
        route.paramMap.get('page') &&
        parseInt(route.paramMap.get('page'), 10) <= 0
    ) {
        // Get the parent url
        const url = state.url.split('/').slice(0, -1).join('/') + '/1';

        // Navigate to there
        router.navigateByUrl(url);

        // Don't allow request to go through
        return false;
    }

    // Create and build the sources array
    const sources = [];

    // If folder is set on the parameters...
    if (route.paramMap.get('folder')) {
        sources.push(
            communicationsService.getCommunicationsByFolder(
                route.paramMap.get('folder'),
                route.paramMap.get('page')
            )
        );
    }

    // If filter is set on the parameters...
    if (route.paramMap.get('filter')) {
        sources.push(
            communicationsService.getCommunicationsByFilter(
                route.paramMap.get('filter'),
                route.paramMap.get('page')
            )
        );
    }

    // If label is set on the parameters...
    if (route.paramMap.get('label')) {
        sources.push(
            communicationsService.getCommunicationsByLabel(
                route.paramMap.get('label'),
                route.paramMap.get('page')
            )
        );
    }

    // Fork join all the sources
    return forkJoin(sources).pipe(
        finalize(() => {
            // If there is no selected communication, reset the communication every
            // time communication list changes. This will ensure that the
            // communication will be reset while navigating between the
            // folders/filters/labels, but it won't reset on page
            // reload if we are reading a communication.

            // Try to get the current activated route
            let currentRoute = route;
            while (currentRoute.firstChild) {
                currentRoute = currentRoute.firstChild;
            }

            // Make sure there is no 'id' parameter on the current route
            if (!currentRoute.paramMap.get('id')) {
                // Reset the communication
                communicationsService.resetCommunication().subscribe();
            }
        }),

        // Error here means the requested page is not available
        catchError((error) => {
            // Log the error
            console.error(error.message);

            // Get the parent url and append the last possible page number to the parent url
            const url =
                state.url.split('/').slice(0, -1).join('/') +
                '/' +
                error.pagination.lastPage;

            // Navigate to there
            router.navigateByUrl(url);

            // Throw an error
            return throwError(error);
        })
    );
};

/**
 * Communication resolver
 *
 * @param route
 * @param state
 */
const communicationResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const communicationsService = inject(CommunicationsService);
    const router = inject(Router);

    return communicationsService.getCommunicationById(route.paramMap.get('id')).pipe(
        // Error here means the requested communication is either
        // not available on the requested page or not
        // available at all
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

export default [
    {
        path: '',
        redirectTo: 'inbox/1',
        pathMatch: 'full',
    },
    {
        path: 'filter/:filter',
        redirectTo: 'filter/:filter/1',
        pathMatch: 'full',
    },
    {
        path: 'label/:label',
        redirectTo: 'label/:label/1',
        pathMatch: 'full',
    },
    {
        path: ':folder',
        redirectTo: ':folder/1',
        pathMatch: 'full',
    },
    {
        path: '',
        component: CommunicationsComponent,
        resolve: {
            filters: () => inject(CommunicationsService).getFilters(),
            folders: () => inject(CommunicationsService).getFolders(),
            labels: () => inject(CommunicationsService).getLabels(),
        },
        children: [
            {
                component: CommunicationsListComponent,
                matcher: communicationsRouteMatcher,
                runGuardsAndResolvers: communicationsRunGuardsAndResolvers,
                resolve: {
                    communications: communicationsResolver,
                },
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: CommunicationsEmptyDetailsComponent,
                    },
                    {
                        path: ':id',
                        component: CommunicationsDetailsComponent,
                        resolve: {
                            communication: communicationResolver,
                        },
                    },
                ],
            },
            {
                path: 'settings',
                component: CommunicationsSettingsComponent,
            },
        ],
    },
] as Routes;
