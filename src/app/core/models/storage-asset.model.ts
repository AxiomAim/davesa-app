import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './user.model';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class StorageAssetModel {

    constructor(
        id: string,
        orgId: string,
        sort?: number,
        name?: string,
        icon?: string,
        description?: string,
        imageUrl?: string
    
    ) {
        this.id = id;
        this.orgId = orgId;
        this.sort = sort;
        this.name = name;
        this.icon = icon;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    public id: string;
    public orgId: string;
    public sort: number;
    public name: string;
    public icon: string;
    public description: string;
    public imageUrl: string;


    public static emptyDto(): StorageAssetDto {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            sort: null,
            name: null,
            icon: null,
            description: null,
            imageUrl: null
        }
    }

    public static toDto(dto: StorageAssetDto): StorageAssetDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            sort: dto.sort ? dto.sort : 1,
            name: dto.name ? dto.name : null,
            icon: dto.icon ? dto.icon : null,
            description: dto.description,
            imageUrl: dto.imageUrl ? dto.imageUrl : null,
        };
    }

}

export interface StorageAssetDto extends BaseDto {
    id: string,
    orgId: string,
    sort?: number,
    name?: string,
    icon?: string,
    description?: string,
    imageUrl?: string
}


export class LinkAssetModel {

    constructor(
        id: string,
        orgId: string,
        name?: string,
        description?: string,
        link?: string
    
    ) {
        this.id = id;
        this.orgId = orgId;
        this.name = name;
        this.description = description;
        this.link = link;
    }
    public id: string;
    public orgId: string;
    public name: string;
    public description: string;
    public link: string;


    public static emptyDto(): AssetLinkDto {
        return {
            id: uuidv4().toString(),
            orgId: null,
            name: null,
            description: null,
            link: null
        }
    }

    public static toDto(dto: AssetLinkDto): AssetLinkDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            name: dto.name ? dto.name : null,
            description: dto.description,
            link: dto.link ? dto.link : null,
        };
    }
}
export interface AssetLinkDto extends BaseDto{
    id: string
    orgId: string,
    name?: string,
    description?: string,
    link?: string
}

