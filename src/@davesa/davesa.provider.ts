import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    APP_INITIALIZER,
    ENVIRONMENT_INITIALIZER,
    EnvironmentProviders,
    Provider,
    importProvidersFrom,
    inject,
} from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
    DAVESA_MOCK_API_DEFAULT_DELAY,
    mockApiInterceptor,
} from '@davesa/lib/mock-api';
import { DavesaConfig } from '@davesa/services/config';
import { DAVESA_CONFIG } from '@davesa/services/config/config.constants';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
import {
    DavesaLoadingService,
    davesaLoadingInterceptor,
} from '@davesa/services/loading';
import { DavesaMediaWatcherService } from '@davesa/services/media-watcher';
import { DavesaPlatformService } from '@davesa/services/platform';
import { DavesaSplashScreenService } from '@davesa/services/splash-screen';
import { DavesaUtilsService } from '@davesa/services/utils';
import { davesaVisitInterceptor, DavesaVisitService } from './services/visit';

export type DavesaProviderConfig = {
    mockApi?: {
        delay?: number;
        services?: any[];
    };
    davesa?: DavesaConfig;
};

/**
 * Davesa provider
 */
export const provideDavesa = (
    config: DavesaProviderConfig
): Array<Provider | EnvironmentProviders> => {
    // Base providers
    const providers: Array<Provider | EnvironmentProviders> = [
        {
            // Disable 'theme' sanity check
            provide: MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme: false,
                version: true,
            },
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            },
        },
        {
            provide: DAVESA_MOCK_API_DEFAULT_DELAY,
            useValue: config?.mockApi?.delay ?? 0,
        },
        {
            provide: DAVESA_CONFIG,
            useValue: config?.davesa ?? {},
        },

        importProvidersFrom(MatDialogModule),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(DavesaConfirmationService),
            multi: true,
        },

        provideHttpClient(withInterceptors([davesaLoadingInterceptor])),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(DavesaLoadingService),
            multi: true,
        },

        provideHttpClient(withInterceptors([davesaVisitInterceptor])),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(DavesaVisitService),
            multi: true,
        },

        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(DavesaMediaWatcherService),
            multi: true,
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(DavesaPlatformService),
            multi: true,
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(DavesaSplashScreenService),
            multi: true,
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(DavesaUtilsService),
            multi: true,
        },
    ];

    // Mock Api services
    if (config?.mockApi?.services) {
        providers.push(
            provideHttpClient(withInterceptors([mockApiInterceptor])),
            {
                provide: APP_INITIALIZER,
                deps: [...config.mockApi.services],
                useFactory: () => (): any => null,
                multi: true,
            }
        );
    }

    // Return the providers
    return providers;
};
