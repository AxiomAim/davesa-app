import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from './base-dto.model';

export class SupportTicketPostModel {

    constructor(
        id                  : string,
        orgId: string,
        supportTicketId     : string,
        title               : string,
        message             : string,
        sent                : boolean,
        userId              : string,
        userEmail           : string,
        userName            : string,
        created_at          : string,
        image?              : string,
        images?             : string[],
        imageUrl?           : string,
        sent_at?            : string,
        deleted_at?         : string,
        closing_post?       : boolean
    ) {
        this.id = id;
        this.orgId = orgId;
        this.supportTicketId = supportTicketId;
        this.title = title;
        this.message = message;
        this.sent = sent;
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
        this.created_at = created_at;
        this.image = image;
        this.images = images;
        this.imageUrl = imageUrl;
        this.sent_at = sent_at;
        this.deleted_at = deleted_at;
        this.closing_post = closing_post;
    }
    public id: string;
    public orgId: string;
    public supportTicketId: string;
    public title: string;
    public message: string;
    public sent: boolean;
    public userId: string;
    public userEmail: string;
    public userName: string;
    public created_at: string;
    public image: string;
    public images: string[];
    public imageUrl: string;
    public sent_at: string;
    public deleted_at: string;
    public closing_post: boolean;

    public static fromDto(support: SupportTicketPostDto): SupportTicketPostModel {
        return new SupportTicketPostModel(
            support.id, 
            support.orgId,
            support.supportTicketId, 
            support.title, 
            support.message, 
            support.sent, 
            support.userId, 
            support.userEmail, 
            support.userName, 
            support.created_at,
            support.image,
            support.images,
            support.imageUrl, 
            support.sent_at,
            support.deleted_at,
            support.closing_post,
            );
    }

    public static emptyDto(): SupportTicketPostDto {
        let date: any = new Date().toISOString(); 
        return {
            id: uuidv4().toString(),
            orgId: null,
            supportTicketId: null,
            title: '',
            message: "Add your message here.",
            sent: false,
            userId: null,
            userEmail: null,
            userName: null,
            created_at: date,
            image: null,
            images: [],
            imageUrl: null,
            sent_at: date,
            deleted_at: '',
            closing_post: false,
        }
    }

    public toDto(): SupportTicketPostDto {
        return {
            id: this.id,
            orgId: this.orgId,
            supportTicketId: this.supportTicketId,
            title: this.title,
            message: this.message,
            sent: this.sent,
            userId: this.userId,
            userEmail: this.userEmail,
            userName: this.userName,
            created_at: this.created_at,
            image: this.image,
            images: this.images,
            imageUrl: this.imageUrl,
            sent_at: this.sent_at,
            deleted_at: this.deleted_at,
            closing_post: this.closing_post,
        };
    }
}

export interface SupportTicketPostDto extends BaseDto {
    id: string, 
    orgId: string,
    supportTicketId: string,
    title: string, 
    message: string, 
    sent: boolean, 
    userId: string, 
    userEmail: string, 
    userName: string, 
    created_at: string,
    image?: string,
    images?: string[],
    imageUrl?: string, 
    sent_at?: string,
    deleted_at?: string,
    closing_post?: boolean,
}

