
import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from './base-dto.model';
import { UserDto } from './user.model';

export class EsourceDataModel {
    constructor(
        id: string,
        orgId: string,
        esourceId: string,
        json?: any,
        surveyData?: any,
        userId?: string,
        formUser?: UserDto,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string
    ) {
        this.id = id;
        orgId = orgId;
        this.esourceId = esourceId;
        this.json = json;
        this.surveyData = surveyData;
        this.userId = userId;
        this.formUser = formUser;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public orgId: string;
    public esourceId: string;
    public json: any;
    public surveyData: any;
    public userId: string;
    public formUser: UserDto;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: EsourceDataDto): EsourceDataDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            esourceId: dto.esourceId ? dto.esourceId : '',
            json: dto.json ? dto.json : '',
            surveyData: dto.surveyData ? dto.surveyData : '',
            userId: dto.userId ? dto.userId : null,
            formUser: dto.formUser ? dto.formUser : null,
            created_at: dto.created_at ? dto.created_at : null,
            updated_at: dto.updated_at ? dto.updated_at : null,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): EsourceDataDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            esourceId: '',
            json: '',
            surveyData: '',
            userId: null,
            formUser: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        };
    }
}

export interface EsourceDataDto extends BaseDto {
    id: string;
    orgId: string;
    esourceId: string;
    json?: any;
    surveyData?: any;
    userId: string;
    formUser: UserDto;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}