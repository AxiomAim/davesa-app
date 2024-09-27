import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { isAuthDavesaGuard } from './core/auth-davesa/guards/isAuthDavesaguard';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'dashboards/clinic'},

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {
        path: 'signed-in-redirect', 
        pathMatch : 'full', 
        redirectTo: 'dashboards/clinic'
    },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth-davesa/davesa-confirmation-required/davesa-confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth-davesa/davesa-forgot-password/davesa-forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth-davesa/davesa-reset-password/davesa-reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth-davesa/davesa-sign-in/davesa-sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth-davesa/davesa-sign-up/davesa-sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [isAuthDavesaGuard],
        canActivateChild: [isAuthDavesaGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth-davesa/davesa-sign-out/davesa-sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth-davesa/davesa-unlock-session/davesa-unlock-session.routes')}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
        ]
    },

    // Davesa routes
    {
        path: '',
        canActivate: [isAuthDavesaGuard],
        canActivateChild: [isAuthDavesaGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [

            // Dashboards
            {path: 'dashboards', children: [
                {path: 'clinic', loadChildren: () => import('app/modules/davesa/dashboards/clinic/clinic.routes')},
                {path: 'analytics', loadChildren: () => import('app/modules/davesa/dashboards/analytics/analytics.routes')},
                {path: 'finance', loadChildren: () => import('app/modules/davesa/dashboards/finance/finance.routes')},
                {path: 'crypto', loadChildren: () => import('app/modules/davesa/dashboards/crypto/crypto.routes')},
            ]},

            // Apps
            {path: 'apps', children: [
                {path: 'studies', loadChildren: () => import('app/modules/davesa/apps/studies/studies.routes')},
                {path: 'participants', loadChildren: () => import('app/modules/davesa/apps/participants/participants.routes')},
                {path: 'visits', loadChildren: () => import('app/modules/davesa/apps/visits/visits.routes')},
                {path: 'users', loadChildren: () => import('app/modules/davesa/apps/users/users.routes')},
                {path: 'sponsors', loadChildren: () => import('app/modules/davesa/apps/sponsors/sponsors.routes')},
                {path: 'cros', loadChildren: () => import('app/modules/davesa/apps/cros/cros.routes')},
                {path: 'irbs', loadChildren: () => import('app/modules/davesa/apps/irbs/irbs.routes')},
                {path: 'study-admin', loadChildren: () => import('app/modules/davesa/apps/study-admin/study-admin.routes')},
                {path: 'study-constructor', loadChildren: () => import('app/modules/davesa/apps/study-constructor/study-constructor.routes')},
                {path: 'mailbox', loadChildren: () => import('app/modules/davesa/apps/mailbox/mailbox.routes')},
            ]},

        ]
    }
];
