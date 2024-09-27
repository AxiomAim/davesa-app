import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DavesaECommunicationConfig } from '../e-communication.types';

@Component({
    selector: 'davesa-ecommunication-dialog',
    templateUrl: './dialog.component.html',
    styles: [
        `
            .davesa-ecommunication-dialog-panel {
                @screen md {
                    @apply w-200;
                }

                .mat-mdc-dialog-container {
                    .mat-mdc-dialog-surface {
                        padding: 0 !important;
                    }
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule, 
        MatDialogModule, 
        MatIconModule, 
        MatButtonToggleModule,
        NgClass,
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule,

    ],
})
export class DavesaECommunicationDialogComponent implements OnInit{
    formFieldCommunication: string[] = [''];
    formFieldRecipients: string[] = [''];
    communicationForm: FormGroup;
    data: DavesaECommunicationConfig = inject(MAT_DIALOG_DATA);
    constructor(
        private _formBuilder: FormBuilder
    ) {

    }

    ngOnInit(): void {  

        this.communicationForm = this._formBuilder.group({
            subject_oid: [''],
            title: ["", Validators.required],
            message: ["", Validators.required],
            eform_id: ["", Validators.required],
            message_type: ["email", Validators.required],
        });

        if(this.data.title){
            this.formFieldCommunication.push(this.data.title);
        }
        if(this.data.message){
            this.formFieldCommunication.push(this.data.message);
        }
        if(this.data.actions?.confirm?.show){
            this.formFieldCommunication.push(this.data.actions.confirm.label);
        }
        if(this.data.actions?.cancel?.show){
            this.formFieldCommunication.push(this.data.actions.cancel.label);
        }
    }
}
