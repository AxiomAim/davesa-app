import { v4 as uuidv4 } from 'uuid';;
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class StorageModel extends BaseDatabaseModel {
    public types = [
        {
            name: 'link'
        },
        {
            name: 'image'
        },
        {
            name: 'document'
        },
        {
            name: 'video'
        }
    ];   
    
    constructor(
        id: string,
        orgId: string,
        sort: number,
        name?: string,
        description?: string,
        type?: string,
        url?: string,
        created_at?: string
        ) {
        super();
        this.id = id;
        this.orgId = orgId;
        this.sort = sort;
        this.name = name;
        this.description = description;
        this.type = type;
        this.url = url;
        this.created_at = created_at;
    }
    public id: string;
    public orgId: string;
    public sort: number;
    public name: string;
    public description: string;
    public type: string;
    public url: string;
    public created_at: string;

    public static toDto(dto: StorageDto): StorageDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            sort: dto.sort ? dto.sort : null,
            name: dto.name ? dto.name : null,
            description: dto.description ? dto.description : null,
            type: dto.type ? dto.type : null,
            url: dto.url ? dto.url : null,            
            created_at: dto.created_at ? dto.created_at : null,
        };
    }

    public static emptyDto(): StorageDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            sort: null,
            name: null,
            description: null,
            type: null,
            url: null,
            created_at: datetime,
        }
    }

}

export interface StorageDto extends BaseDto {
    id: string,
    orgId: string,
    sort: number,
    name?: string,
    description?: string,
    type?: string,
    url?: string,
    created_at?: string
}


