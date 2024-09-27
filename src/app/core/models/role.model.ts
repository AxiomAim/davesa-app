import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { v4 as uuidv4 } from 'uuid';
import { StorageAssetDto } from './storage-asset.model';
import { UserDto } from './user.model';
import { OrgDto } from './org.model';

export class RoleModel extends BaseDatabaseModel {

    constructor(
        id: string,
        orgId: string,
        sort: number,
        name: string,
        description: string,
        org: OrgDto[],
        users: UserDto[],
    ) {
        super();
        this.id = id;
        this.orgId = orgId;
        this.sort = sort;
        this.name = name;
        this.description = description;
        this.org = org;
        this.users = users;
    }
    public id: string;
    public orgId: string;
    public sort: number;
    public name: string;
    public description: string;
    public org: OrgDto[];
    public users: UserDto[];

    public static toDto(dto: RoleDto): RoleDto {
        const datetime = new Date().toISOString();
        return {
            id: dto.id,
            orgId: dto.orgId,
            sort: dto.sort ? dto.sort : null,
            name: dto.name ? dto.name : null,
            description: dto.description ? dto.description : null,
            org: dto.org ? dto.org : [],
            users: dto.users ? dto.users : [],
        };
    }

    public static emptyDto(): RoleDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            sort: 1,
            name: null,
            description: null,
            org: [],
            users: []
        }
    }

}

export interface RoleDto extends BaseDto {
    id: string;
    orgId: string;
    sort: number;
    name: boolean;
    description: string;
    org: OrgDto[],
    users: UserDto[];
}


