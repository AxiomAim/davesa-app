import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { StudyAdminComponent } from 'app/modules/davesa/apps/study-admin/study-admin.component';
import { StudyAdminService } from 'app/modules/davesa/apps/study-admin/study-admin.service';
import { StudyAdminDetailsComponent } from 'app/modules/davesa/apps/study-admin/details/details.component';
import { StudyAdminListComponent } from 'app/modules/davesa/apps/study-admin/list/list.component';
import { catchError, throwError } from 'rxjs';
import { StudyAdminTableComponent } from './table/table.component';

/**
 * Study resolver
 *
 * @param route
 * @param state
 */
const studyAdminResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _studyAdminService = inject(StudyAdminService);
    const router = inject(Router);

    return _studyAdminService.getStudyById(route.paramMap.get('oid')).pipe(
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
    // const studyConstructorService = inject(StudyAdminService);
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
    component: StudyAdminDetailsComponent,
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
        component: StudyAdminComponent,
        resolve: {
            // tags: () => inject(StudiesService).getTags(),
        },

        children: [
            // {path: 'communications', loadChildren: () => import('app/modules/davesa/apps/studies/communications/communications.routes')},
            // {path: 'visit-console', loadChildren: () => import('app/modules/davesa/apps/studies/visit-console/visit-console.routes')},
            {
                path: '',
                component: StudyAdminListComponent,
                resolve: {
                    studies: () => inject(StudyAdminService).getStudies(),
                    // study: () => inject(StudyAdminService).getStudy(),
                },
                children: [
                    {
                        path: ':oid',
                        component: StudyAdminDetailsComponent,
                        resolve: {
                            study: studyAdminResolver,
                        },
                        canDeactivate: [canDeactivateStudiesDetails],
                    },
        
                ],
            },
            {
                path: 'table',
                component: StudyAdminTableComponent,
                resolve: {
                    study: studyTableResolver,
                },

            },

        ],
    },
] as Routes;
