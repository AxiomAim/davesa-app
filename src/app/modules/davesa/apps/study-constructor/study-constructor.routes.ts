import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { StudyConstructorComponent } from 'app/modules/davesa/apps/study-constructor/study-constructor.component';
import { StudyConstructorService } from 'app/modules/davesa/apps/study-constructor/study-constructor.service';
import { StudyConstructorDetailsComponent } from 'app/modules/davesa/apps/study-constructor/details/details.component';
import { StudyConstructorListComponent } from 'app/modules/davesa/apps/study-constructor/list/list.component';
import { catchError, throwError } from 'rxjs';
import { StudyConstructorTableComponent } from './table/table.component';

/**
 * Study resolver
 *
 * @param route
 * @param state
 */
const studyConstructorResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const studyConstructorService = inject(StudyConstructorService);
    const router = inject(Router);

    return studyConstructorService.getStudyById(route.paramMap.get('oid')).pipe(
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

const studyTableResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    // const studyConstructorService = inject(StudyConstructorService);
    // const router = inject(Router);

    // return studyConstructorService.getStudyById(route.paramMap.get('oid')).pipe(
    //     // Error here means the requested study is not available
    //     catchError((error) => {
    //         // Log the error
    //         console.error(error);

    //         // Get the parent url
    //         const parentUrl = state.url.split('/').slice(0, -1).join('/');

    //         // Navigate to there
    //         router.navigateByUrl(parentUrl);

    //         // Throw an error
    //         return throwError(error);
    //     })
    // );
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
    component: StudyConstructorDetailsComponent,
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
        component: StudyConstructorComponent,
        resolve: {
            // tags: () => inject(StudiesService).getTags(),
        },

        children: [
            // {path: 'communications', loadChildren: () => import('app/modules/davesa/apps/studies/communications/communications.routes')},
            // {path: 'visit-console', loadChildren: () => import('app/modules/davesa/apps/studies/visit-console/visit-console.routes')},
            {
                path: '',
                component: StudyConstructorListComponent,
                resolve: {
                    studies: () => inject(StudyConstructorService).getStudies(),
                    study: () => inject(StudyConstructorService).getStudy(),
                },
                children: [
                    {
                        path: ':oid',
                        component: StudyConstructorDetailsComponent,
                        resolve: {
                            study: studyConstructorResolver,
                        },
                        canDeactivate: [canDeactivateStudiesDetails],
                    },
        
                ],
            },
            {
                path: 'table',
                component: StudyConstructorTableComponent,
                resolve: {
                    study: studyTableResolver,
                },

            },

        ],
    },
] as Routes;
