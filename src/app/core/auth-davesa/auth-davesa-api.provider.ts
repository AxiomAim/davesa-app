import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    APP_INITIALIZER,
    ENVIRONMENT_INITIALIZER,
    EnvironmentProviders,
    Provider,
    inject,
} from '@angular/core';
import { authDavesaApiInterceptor } from './auth-davesa-api.interceptor';
import { AlertMessagesService } from '@davesa/components/alert-messages/alert-messages.service';
import { ParticipantsV2Service } from '../services/participants-v2.service';
import { AuthDavesaApiService } from './auth-davesa-api.service';
import { StudiesV2Service } from '../services/studies-v2.service';

export const provideAuthDavesaApi = (): Array<Provider | EnvironmentProviders> => {
    return [
        provideHttpClient(withInterceptors([authDavesaApiInterceptor])),
        {
            provide: HTTP_INTERCEPTORS,
            useValue: () => inject(AuthDavesaApiService),
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useValue: () => inject(AlertMessagesService),
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useValue: () => inject(ParticipantsV2Service),
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useValue: () => inject(StudiesV2Service),
            multi: true,
        },
    ];
};
