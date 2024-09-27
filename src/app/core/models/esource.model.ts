
import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { TrialDto } from './trial.model';

const defaultJson = {
    pages: [{
        name: "Name",
        elements: [{
            name: "FirstName",
            title: "Enter your first name:",
            type: "text"
        }, {
            name: "LastName",
            title: "Enter your last name:",
            type: "text"
        }]
    }]
};

export class EsourceModel {
    constructor(
        id: string,
        orgId: string,
        version: number,
        name: string,
        description: string,
        json: any,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string
    ) {
        this.id = id;
        this.orgId = orgId;
        this.version = version;
        this.name = name;
        this.description = description;
        this.json = json;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public orgId: string;
    public version: number;
    public name: string;
    public description: string;
    public json: any;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: EsourceDto): EsourceDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            version: dto.version ? dto.version : null,
            name: dto.name ? dto.name : null,
            description: dto.description ? dto.description : null,
            json: dto.json ? dto.json : null,
            created_at: dto.created_at ? dto.created_at : null,
            updated_at: dto.updated_at ? dto.updated_at : null,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): EsourceDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            version: 1,
            name: null,
            description: null,
            json: defaultJson,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        };
    }
}

export interface EsourceDto extends BaseDto {
    id: string;
    orgId: string;
    version: number;
    name: string;
    description: string;
    json: any;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}