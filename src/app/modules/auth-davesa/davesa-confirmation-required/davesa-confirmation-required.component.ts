import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { davesaAnimations } from '../../../../@davesa/animations/public-api';

@Component({
    selector: 'auth-davesa-confirmation-required',
    templateUrl: './davesa-confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: davesaAnimations,
    standalone: true,
    imports: [RouterLink],
})
export class AuthDavesaConfirmationRequiredComponent {
    /**
     * Constructor
     */
    constructor() {}
}
