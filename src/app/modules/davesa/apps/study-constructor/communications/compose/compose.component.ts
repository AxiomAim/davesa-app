import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
    selector: 'communications-compose',
    templateUrl: './compose.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        QuillEditorComponent,
        MatButtonToggle,
        MatIconModule, 
        MatButtonToggleModule,
        NgClass,
        TextFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatIconModule

    ],
})
export class CommunicationsComposeComponent implements OnInit {
    formFieldType: string[] = [''];
    formFieldRecipients: string[] = [''];

    composeForm: UntypedFormGroup;
    copyFields: { cc: boolean; bcc: boolean } = {
        cc: false,
        bcc: false,
    };
    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<CommunicationsComposeComponent>,
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
        this.composeForm = this._formBuilder.group({
            to: ['', [Validators.required, Validators.email]],
            cc: ['', [Validators.email]],
            bcc: ['', [Validators.email]],
            subject: [''],
            body: ['', [Validators.required]],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the copy field with the given field name
     *
     * @param name
     */
    showCopyField(name: string): void {
        // Return if the name is not one of the available names
        if (name !== 'cc' && name !== 'bcc') {
            return;
        }

        // Show the field
        this.copyFields[name] = true;
    }

    /**
     * Save and close
     */
    saveAndClose(): void {
        // Save the message as a draft
        this.saveAsDraft();

        // Close the dialog
        this.matDialogRef.close();
    }

    /**
     * Discard the message
     */
    discard(): void {}

    /**
     * Save the message as a draft
     */
    saveAsDraft(): void {}

    /**
     * Send the message
     */
    send(): void {}
}
