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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { davesaAnimations } from '@davesa/animations';
import { DavesaAlertComponent, DavesaAlertType } from '@davesa/components/alert';
import { DavesaValidators } from '@davesa/validators';
 import { AuthDavesaApiService } from 'app/core/auth-davesa/auth-davesa-api.service';

@Component({
    selector: 'auth-davesa-reset-password',
    templateUrl: './davesa-reset-password.component.html',
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
        MatIconModule,
        MatProgressSpinnerModule,
        RouterLink,
    ],
})
export class AuthDavesaResetPasswordComponent implements OnInit {
    @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;
    private _authDavesaApiService = inject(AuthDavesaApiService);

    alert: { type: DavesaAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    resetPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.resetPasswordForm = this._formBuilder.group(
            {
                password: ['', Validators.required],
                passwordConfirm: ['', Validators.required],
            },
            {
                validators: DavesaValidators.mustMatch(
                    'password',
                    'passwordConfirm'
                ),
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset password
     */
    resetPassword(): void {
        // Return if the form is invalid
        if (this.resetPasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.resetPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Send the request to the server
        // this._authService
        //     .resetPassword(this.resetPasswordForm.get('password').value)
        //     .pipe(
        //         finalize(() => {
        //             // Re-enable the form
        //             this.resetPasswordForm.enable();

        //             // Reset the form
        //             this.resetPasswordNgForm.resetForm();

        //             // Show the alert
        //             this.showAlert = true;
        //         })
        //     )
        //     .subscribe(
        //         (response) => {
        //             // Set the alert
        //             this.alert = {
        //                 type: 'success',
        //                 message: 'Your password has been reset.',
        //             };
        //         },
        //         (response) => {
        //             // Set the alert
        //             this.alert = {
        //                 type: 'error',
        //                 message: 'Something went wrong, please try again.',
        //             };
        //         }
        //     );
    }
}
