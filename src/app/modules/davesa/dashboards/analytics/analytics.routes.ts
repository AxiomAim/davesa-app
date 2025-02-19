import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AnalyticsComponent } from 'app/modules/davesa/dashboards/analytics/analytics.component';
import { AnalyticsService } from 'app/modules/davesa/dashboards/analytics/analytics.service';

export default [
    {
        path: '',
        component: AnalyticsComponent,
        resolve: {
            data: () => inject(AnalyticsService).getData(),
        },
    },
] as Routes;
