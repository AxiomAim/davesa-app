
import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { StorageDto } from './storage.model';


export class TrialModel {
    constructor(
        id: string,
        orgId: string,
        parentId: string,
        sort: number,
        root: boolean,
        children: TrialDto[],
        siteId: string,
        indicationId: string,
        name: string,
        title: string,
        description: string,
        active: boolean,
        sponsor: string,
        protocol: string,
        phase: string,
        status: string,
        recruiting: boolean,
        eSourceId: string, 
        assets: StorageDto[],
        created_at?: string,
        updated_at?: string,
        deleted_at?: string
    ) {
        this.id = id;
        this.orgId = orgId;
        this.parentId = parentId;
        this.sort = sort;
        this.root = root;
        this.children = children;
        this.siteId = siteId;
        this.indicationId = indicationId;
        this.name = name;
        this.title = title;
        this.description = description;
        this.active = active;
        this.sponsor = sponsor;
        this.protocol = protocol;
        this.phase = phase;
        this.status = status;
        this.recruiting = recruiting;
        this.eSourceId = eSourceId;
        this.assets = assets;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public orgId: string;   
    public parentId: string; 
    public sort: number;
    public root: boolean;
    public children: TrialDto[];
    public siteId: string;
    public indicationId: string;
    public name: string;
    public title: string;
    public description: string;
    public active: boolean;
    public sponsor: string;
    public protocol: string;
    public phase: string;
    public status: string;
    public recruiting: boolean;
    public eSourceId: string;
    public assets: StorageDto[];
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: TrialDto): TrialDto {
        return {
            id: dto.id,
            orgId: dto.orgId ? dto.orgId : null,
            parentId: dto.parentId ? dto.parentId : null,
            sort: dto.sort ? dto.sort : null,
            root: dto.root ? dto.root : null,
            children: dto.children ? dto.children : null,
            siteId: dto.siteId ? dto.siteId : null,
            indicationId: dto.indicationId ? dto.indicationId : null,
            name: dto.name ? dto.name : null,
            title: dto.title ? dto.title : null,
            description: dto.description ? dto.description : null,
            active: dto.active ? dto.active : null,
            sponsor: dto.sponsor ? dto.sponsor : null,
            protocol: dto.protocol ? dto.protocol : null,
            phase: dto.phase ? dto.phase : null,
            status: dto.status ? dto.status : null,
            recruiting: dto.recruiting ? dto.recruiting : null,
            eSourceId: dto.eSourceId ? dto.eSourceId : null,
            assets: dto.assets ? dto.assets : [],
            created_at: dto.created_at ? dto.created_at : null,
            updated_at: dto.updated_at ? dto.updated_at : null,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): TrialDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            parentId: null,
            sort: null,
            root: true,
            children: [],
            siteId: null,
            indicationId: null,
            name: null,
            title: null,
            description: null,
            active: true,
            sponsor: null,
            protocol: null,
            phase: null,
            status: null,
            recruiting: false,
            eSourceId: null,
            assets: [],
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        };
    }
}

export interface TrialDto extends BaseDto {
    id: string;
    orgId: string;
    parentId: string;
    sort: number;
    root: boolean;
    children: TrialDto[];
    siteId: string;
    indicationId: string;
    name: string;
    title: string;
    description: string;
    active: boolean;
    sponsor: string;
    protocol: string;
    phase: string;
    status: string;
    recruiting: boolean;
    eSourceId: string;
    assets: StorageDto[];
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
