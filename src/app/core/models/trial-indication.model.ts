
import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { StorageDto } from './storage.model';

export class TrialIndicationlModel {

    constructor(
        id: string,
        orgId: string,
        sort: number,
        trialIndicationId: string,
        name: string,
        description: string,
        active: boolean,
        assets: StorageDto[],
        created_at?: string,
        updated_at?: string,
        deleted_at?: string
    ) {
        this.id = id;
        this.orgId = orgId;
        this.sort = sort;
        this.trialIndicationId = trialIndicationId;
        this.name = name;
        this.description = description;
        this.active = active;
        this.assets = assets;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public orgId: string;
    public sort: number;
    public trialIndicationId: string;
    public name: string;
    public description: string;
    public active: boolean;
    public assets: StorageDto[];
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: TrialIndicationDto): TrialIndicationDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            sort: dto.sort ? dto.sort : null,
            trialIndicationId: dto.trialIndicationId ? dto.trialIndicationId : null,
            name: dto.name ? dto.name : null,
            description: dto.description ? dto.description : null,
            active: dto.active ? dto.active : true,
            assets: dto.assets ? dto.assets : [],            
            created_at: dto.created_at ? dto.created_at : null,
            updated_at: dto.updated_at ? dto.updated_at : null,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): TrialIndicationDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            sort: null,
            name: null,
            trialIndicationId: null,
            description: null,
            active: true,
            assets: [],
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        };
    }
}

export interface TrialIndicationDto extends BaseDto {
    id: string;
    orgId: string;
    sort: number;
    trialIndicationId: string;
    name: string;
    description: string;
    active: boolean;
    assets: StorageDto[];
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

