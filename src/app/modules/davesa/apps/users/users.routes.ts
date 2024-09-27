import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { UsersComponent } from 'app/modules/davesa/apps/users/users.component';
import { UsersService } from 'app/modules/davesa/apps/users/users.service';
import { UsersDetailsComponent } from 'app/modules/davesa/apps/users/details/details.component';
import { UsersListComponent } from 'app/modules/davesa/apps/users/list/list.component';
import { catchError, throwError } from 'rxjs';

/**
 * User resolver
 *
 * @param route
 * @param state
 */
const userResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const usersService = inject(UsersService);
    const router = inject(Router);

    return usersService.getById(route.paramMap.get('oid')).pipe(
        // Error here means the requested user is not available
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
 * Can deactivate users details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivateUsersDetails = (
    component: UsersDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/users'
    // it means we are navigating away from the
    // users app
    if (!nextState.url.includes('/users')) {
        // Let it navigate
        return true;
    }

    // If we are navigating to another user...
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
        component: UsersComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: UsersListComponent,
                resolve: {
                    users: () => inject(UsersService).getAll(),
                },
                children: [
                    {
                        path: ':oid',
                        component: UsersDetailsComponent,
                        resolve: {
                            user: userResolver,
                        },
                        canDeactivate: [canDeactivateUsersDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
