import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ClinicComponent } from 'app/modules/davesa/dashboards/clinic/clinic.component';
import { ClinicService } from 'app/modules/davesa/dashboards/clinic/clinic.service';

export default [
    {
        path: '',
        component: ClinicComponent,
        resolve: {
            data: () => inject(ClinicService).getData(),
        },
    },
] as Routes;
