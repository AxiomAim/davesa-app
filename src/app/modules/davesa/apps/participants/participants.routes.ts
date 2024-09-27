import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { ParticipantsComponent } from 'app/modules/davesa/apps/participants/participants.component';
import { ParticipantsService } from 'app/modules/davesa/apps/participants/participants.service';
import { ParticipantsDetailsComponent } from 'app/modules/davesa/apps/participants/details/details.component';
import { ParticipantsListComponent } from 'app/modules/davesa/apps/participants/list/list.component';
import { catchError, throwError } from 'rxjs';

/**
 * Participant resolver
 *
 * @param route
 * @param state
 */
const participantResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const participantsService = inject(ParticipantsService);
    const router = inject(Router);

    return participantsService.getByOid(route.paramMap.get('oid')).pipe(
        // Error here means the requested participant is not available
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
 * Can deactivate participants details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivateParticipantsDetails = (
    component: ParticipantsDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/participants'
    // it means we are navigating away from the
    // participants app
    if (!nextState.url.includes('/participants')) {
        // Let it navigate
        return true;
    }

    // If we are navigating to another participant...
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
        component: ParticipantsComponent,
        resolve: {

        },

        children: [
            {
                path: '',
                component: ParticipantsListComponent,
                resolve: {
                    participants: () => inject(ParticipantsService).getAll(),
                    participant: () => inject(ParticipantsService).getItem(),
                },
                children: [
                    {
                        path: ':oid',
                        component: ParticipantsDetailsComponent,
                        resolve: {
                            participant: participantResolver,
                        },
                        canDeactivate: [canDeactivateParticipantsDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
