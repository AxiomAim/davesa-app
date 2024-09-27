
import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from './base-dto.model';
import { UserDto } from './user.model';

export class EconsentModel {
    constructor(
        id: string,
        orgId: string,
        esourceId: string,
        json?: any,
        surveyData?: any,
        user?: UserDto,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string
    ) {
        this.id = id;
        orgId = orgId;
        this.esourceId = esourceId;
        this.json = json;
        this.surveyData = surveyData;
        this.user = user;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public orgId: string;
    public esourceId: string;
    public json: any;
    public surveyData: any;
    public user: UserDto;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: EconsentDto): EconsentDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            esourceId: dto.esourceId ? dto.esourceId : '',
            json: dto.json ? dto.json : '',
            surveyData: dto.surveyData ? dto.surveyData : '',
            user: dto.user ? dto.user : null,
            created_at: dto.created_at ? dto.created_at : null,
            updated_at: dto.updated_at ? dto.updated_at : null,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): EconsentDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            esourceId: '',
            json: '',
            surveyData: '',
            user: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        };
    }
}

export interface EconsentDto extends BaseDto {
    id: string;
    orgId: string;
    esourceId: string;
    json?: any;
    surveyData?: any;
    user?: UserDto;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}