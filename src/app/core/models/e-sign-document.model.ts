import { v4 as uuidv4 } from 'uuid';
import { UserDto, UserModel } from './user.model';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class EsignDocumentModel {

    constructor(
        id: string, 
        documentId: string,
        brandId: string,
        messageTitle: string,
        documentDescription: string,
        status: string,
        files: string[],
        senderDetail: any,
        signerDetails: any[],
        behalfOf: any,
        ccDetails: any[],
        reminderSettings: any,
        reassign: any[],
        documentHistory: any[],
        activityBy: string,
        activityDate: number,
        activityAction: string,
        createdDate: number,
        expiryDays: number,
        expiryDate: number,
        enableSigningOrder: boolean,
        isDeleted: boolean,
        revokeMessage: string,
        declineMessage: string,
        applicationId: string,
        labels: any[],
        disableEmails: boolean,
        disableExpiryAlert: boolean,
        hideDocumentId: boolean,
        enablePrintAndSign: boolean,
        enableReassign: boolean
    ) {
        this.id = id;
        this.documentId = documentId;
        this.brandId = brandId;
        this.messageTitle = messageTitle;
        this.documentDescription = documentDescription;
        this.status = status;
        this.files = files;
        this.senderDetail = senderDetail;
        this.signerDetails = signerDetails;
        this.behalfOf = behalfOf;
        this.ccDetails = ccDetails;
        this.reminderSettings = reminderSettings;
        this.reassign = reassign;
        this.documentHistory = documentHistory;
        this.activityBy = activityBy;
        this.activityDate = activityDate;
        this.activityAction = activityAction;
        this.createdDate = createdDate;
        this.expiryDays = expiryDays;
        this.expiryDate = expiryDate;
        this.enableSigningOrder = enableSigningOrder;
        this.isDeleted = isDeleted;
        this.revokeMessage = revokeMessage;
        this.declineMessage = declineMessage;
        this.applicationId = applicationId;
        this.labels = labels;
        this.disableEmails = disableEmails;
        this.disableExpiryAlert = disableExpiryAlert;
        this.hideDocumentId = hideDocumentId;
        this.enablePrintAndSign = enablePrintAndSign;
    }
    public id: string;
    public documentId: string;
    public brandId: string;
    public messageTitle: string;
    public documentDescription: string;
    public status: string;
    public files: string[];
    public senderDetail: any;
    public signerDetails: any[];
    public behalfOf: any;
    public ccDetails: any[];
    public reminderSettings: any;
    public reassign: any[];
    public documentHistory: any[];
    public activityBy: string;
    public activityDate: number;
    public activityAction: string;
    public createdDate: number;
    public expiryDays: number;
    public expiryDate: number;
    public enableSigningOrder: boolean;
    public isDeleted: boolean;
    public revokeMessage: string;
    public declineMessage: string;
    public applicationId: string;
    public labels: any[];
    public disableEmails: boolean;
    public disableExpiryAlert: boolean;
    public hideDocumentId: boolean;
    public enablePrintAndSign: boolean;
    public enableReassign: boolean;    

    public static emptyDto(): EsignDocumentDto {
        let datetime: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            documentId: null,
            brandId: null,
            messageTitle: null,
            documentDescription: null,
            status: null,
            files: [],
            senderDetail: null,
            signerDetails: [],
            behalfOf: null,
            ccDetails: [],
            reminderSettings: null,
            reassign: [],
            documentHistory: [],
            activityBy: null,
            activityDate: null,
            activityAction: null,
            createdDate: null,
            expiryDays: null,
            expiryDate: null,
            enableSigningOrder: false,
            isDeleted: false,
            revokeMessage: null,
            declineMessage: null,
            applicationId: null,
            labels: [],
            disableEmails: false,
            disableExpiryAlert: false,
            hideDocumentId: false,
            enablePrintAndSign: false,
            enableReassign: false
        }
    }

    public static toDto(dto: EsignDocumentDto): EsignDocumentDto {
        return {
            id: dto.id,
            documentId: dto.documentId ? dto.documentId : null,
            brandId: dto.brandId ? dto.brandId : null,
            messageTitle: dto.messageTitle ? dto.messageTitle : null,
            documentDescription: dto.documentDescription ? dto.documentDescription : null,
            status: dto.status ? dto.status : null,
            files: dto.files ? dto.files : [],
            senderDetail: dto.senderDetail ? dto.senderDetail : null,
            signerDetails: dto.signerDetails ? dto.signerDetails : [],
            behalfOf: dto.behalfOf ? dto.behalfOf : null,
            ccDetails: dto.ccDetails ? dto.ccDetails : [],
            reminderSettings: dto.reminderSettings ? dto.reminderSettings : null,
            reassign: dto.reassign ? dto.reassign : [],
            documentHistory: dto.documentHistory ? dto.documentHistory : [],
            activityBy: dto.activityBy ? dto.activityBy : null,
            activityDate: dto.activityDate ? dto.activityDate : null,
            activityAction: dto.activityAction ? dto.activityAction : null,
            createdDate: dto.createdDate ? dto.createdDate : null,
            expiryDays: dto.expiryDays ? dto.expiryDays : null,
            expiryDate: dto.expiryDate ? dto.expiryDate : null,
            enableSigningOrder: dto.enableSigningOrder ? dto.enableSigningOrder : false,
            isDeleted: dto.isDeleted ? dto.isDeleted : false,
            revokeMessage: dto.revokeMessage ? dto.revokeMessage : null,
            declineMessage: dto.declineMessage ? dto.declineMessage : null,
            applicationId: dto.applicationId ? dto.applicationId : null,
            labels: dto.labels ? dto.labels : [],
            disableEmails: dto.disableEmails ? dto.disableEmails : false,
            disableExpiryAlert: dto.disableExpiryAlert ? dto.disableExpiryAlert : false,
            hideDocumentId: dto.hideDocumentId ? dto.hideDocumentId : false,
            enablePrintAndSign: dto.enablePrintAndSign ? dto.enablePrintAndSign : false,
            enableReassign: dto.enableReassign ? dto.enableReassign : false            

        };
    }

}

export interface EsignDocumentDto extends BaseDto {
    id: string, 
    documentId: string,
    brandId: string,
    messageTitle: string,
    documentDescription: string,
    status: string,
    files: string[],
    senderDetail: any,
    signerDetails: any[],
    behalfOf: any,
    ccDetails: any[],
    reminderSettings: any,
    reassign: any[],
    documentHistory: any[],
    activityBy: string,
    activityDate: number,
    activityAction: string,
    createdDate: number,
    expiryDays: number,
    expiryDate: number,
    enableSigningOrder: boolean,
    isDeleted: boolean,
    revokeMessage: string,
    declineMessage: string,
    applicationId: string,
    labels: any[],
    disableEmails: boolean,
    disableExpiryAlert: boolean,
    hideDocumentId: boolean,
    enablePrintAndSign: boolean,
    enableReassign: boolean
}


