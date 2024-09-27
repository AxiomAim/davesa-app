import { v4 as uuidv4 } from 'uuid';
import { UserDto, UserModel } from './user.model';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class CsvSignatureModel {

    constructor(
        id: string,    
        orgId: string,
        projectId: string,
        object: string,
        objectId: string,
        isSet: boolean,
        userEmail: string,
        signatureRole?: string,
        signatureUser?: UserDto,
        signatureDate?: string,
        authenticated?: boolean,
        imageUrl?: string,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        
    ) {
        this.id = id;
        this.orgId = orgId;
        this.projectId = projectId;
        this.object = object;
        this.objectId = objectId;
        this.isSet = isSet;
        this.userEmail = userEmail;
        this.signatureRole = signatureRole;
        this.signatureUser = signatureUser;
        this.signatureDate = signatureDate;
        this.authenticated = authenticated;
        this.imageUrl = imageUrl;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;

    }
    public id: string;
    public orgId: string;
    public projectId: string;
    public object: string;
    public objectId: string;
    public isSet: boolean;
    public userEmail: string;
    public signatureRole?: string;
    public signatureUser?: UserDto;
    public signatureDate?: string;
    public authenticated?: boolean;
    public imageUrl?: string;
    public created_at: string;
    public updated_at: string;    
    public deleted_at: string;

    public static emptyDto(): CsvSignatureDto {
        let datetime: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            projectId: null,
            object: null,
            objectId: null,
            isSet: false,
            userEmail: null,
            signatureRole: null,
            signatureUser: UserModel.emptyDto(),
            signatureDate: null,
            authenticated: false,
            imageUrl: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }

    public static toDto(dto: CsvSignatureDto): CsvSignatureDto {
        return {
            id: dto.id,
            orgId: dto.orgId ? dto.orgId : null,
            projectId: dto.projectId ? dto.projectId : null,
            object: dto.object ? dto.object : null,
            objectId: dto.objectId ? dto.objectId : null,
            isSet: dto.isSet ? dto.isSet : false,
            userEmail: dto.userEmail ? dto.userEmail : null,
            signatureRole: dto.signatureRole ? dto.signatureRole : null,
            signatureUser: dto.signatureUser ? dto.signatureUser : null,
            signatureDate: dto.signatureDate ? dto.signatureDate : null,
            authenticated: dto.authenticated ? dto.authenticated : false,
            imageUrl: dto.imageUrl ? dto.imageUrl : null,            
            created_at: dto.created_at ? dto.created_at : null,
            updated_at: dto.updated_at ? dto.updated_at : null,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

}

export interface CsvSignatureDto extends BaseDto {
    id: string,    
    orgId: string,
    projectId: string,
    object: string,
    objectId: string,
    isSet: boolean,
    userEmail: string,
    signatureRole?: string,
    signatureUser?: UserDto,
    signatureDate?: string,
    authenticated?: boolean,
    imageUrl?: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
}


