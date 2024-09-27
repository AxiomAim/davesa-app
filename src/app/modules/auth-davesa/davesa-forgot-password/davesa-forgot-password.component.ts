import { Component, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { davesaAnimations } from '../../../../@davesa/animations/public-api';
import { DavesaAlertComponent } from '../../../../@davesa/components/alert/alert.component';
import { DavesaAlertType } from '../../../../@davesa/components/alert/alert.types';
 import { AuthDavesaApiService } from 'app/core/auth-davesa/auth-davesa-api.service';

@Component({
    selector: 'auth-davesa-forgot-password',
    templateUrl: './davesa-forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: davesaAnimations,
    standalone: true,
    imports: [
        DavesaAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        RouterLink,
    ],
})
export class AuthDavesaForgotPasswordComponent implements OnInit {
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;
    private _authDavesaApiService = inject(AuthDavesaApiService);

    alert: { type: DavesaAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    forgotPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder
    ) {
        console.log('', )
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    async sendResetLink() {
        this.showAlert = false;

        // Return if the form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Forgot password
        await this._authDavesaApiService
            .forgetPasswordMail(this.forgotPasswordForm.get('email').value)
            .subscribe(

                {
                    next: (res) => {
                        this.alert = {
                            type: 'success',
                            message:
                                "Password reset sent! You'll receive an email if you are registered on our system.",
                        };
    
                    },
                    error: (err) => {
                        this.alert = {
                            type: 'error',
                            message: JSON.stringify(err.error.error),
                          };
              
                          // Show the alert
                          this.showAlert = true;
                    }

                }
            );
    }
}
