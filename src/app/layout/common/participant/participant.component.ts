import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnDestroy,
    OnInit,
    signal,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { SafeHtmlPipe } from '@davesa/pipes/safehtml.pipe';
import { DavesaConfigService, Scheme } from '@davesa/services/config';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
import { TranslocoModule } from '@ngneat/transloco';
import { ParticipantsV2Service } from 'app/core/services/participants-v2.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'participant',
    templateUrl: './participant.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
    standalone: true,
    imports: [
        TranslocoModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        NgClass,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatMenuModule,
        NgClass,

    ],
    providers: [
        SafeHtmlPipe
    ],
})
export class ParticipantComponent implements OnInit, OnDestroy {
    // @Input() participant: Participant;
    public participant = inject(ParticipantsV2Service).participant();
    public imageUrl: string;

    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */


    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // // Subscribe to user changes
        console.log('participant', this.participant.name);

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    public getIcon(gender, age) {
        if(gender=='male' && age>=18) {
            return 'davesaicons_solid:man'
        }
        if(gender=='female' && age>=18) {
            return 'davesaicons_solid:woman'
        }
        if(gender=='male' && age<18) {
            return 'davesaicons_solid:boy'
        }
        if(gender=='female' && age<18) {
            return 'davesaicons_solid:girl'
        }
        
        return 'davesaicons_solid:person'
    }
    public getIconColor(gender: any) {
        switch(gender) {
            case 'female':
                return 'text-pink-500 icon-size-10'
            case'male':
                return 'text-blue-500 icon-size-10'
            default:
                return 'text-gray-500 icon-size-10'
        }

    }
    
    public getAgeColor(gender: any) {
        switch(gender) {
            case 'female':
                return 'bg-pink-500 text-white'
            case'male':
                return 'bg-blue-500 text-white text-2xl'
            default:
                return 'bg-gray-500 text-gray-800 icon-size-7'
        }

    }

}
