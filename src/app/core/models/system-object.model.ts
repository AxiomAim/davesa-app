import { v4 as uuidv4 } from 'uuid';
import { MenuItemDto } from "./menu-item.model";
import { BaseDto } from './base-dto.model';

export class SystemobjectModel {
  constructor(
    id: string,
    sort: number,
    name: string,
    permissions: UserRolePermissionsDto,
    created_at: string,
    updated_at: string,
    deleted_at: string,

  ) {
    this.id = id;
    this.sort = sort;
    this.name = name;
    this.permissions = permissions;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;

  }
  public id: string;
  public sort: number;
  public name: string;
  public permissions: UserRolePermissionsDto;
  public created_at: string;
  public updated_at: string;
  public deleted_at: string;

  public static emptyDto(): SystemobjectDto {
    let datetime: any = new Date().toISOString();
    return {
        id: uuidv4().toString(),
        sort: 1,
        name: null,
        permissions: null,
        created_at: datetime,
        updated_at: datetime,
        deleted_at: null,
    }
}


public static toDto(dto: SystemobjectDto): SystemobjectDto {
    let date: any = new Date().toISOString();

    return {
        id: dto.id,
        sort: dto.sort? dto.sort : 1,
        name: dto.name ? dto.name : null,
        permissions: dto.permissions? dto.permissions : null,
        created_at: dto.created_at ? dto.created_at : date,
        updated_at: dto.updated_at ? dto.updated_at : date,
        deleted_at: dto.deleted_at ? dto.deleted_at : null,
    };
}

}

export interface SystemobjectDto extends BaseDto {
  id: string,
  sort: number,
  name: string;
  permissions: UserRolePermissionsDto,
  created_at: string,
  updated_at: string,
  deleted_at: string,
}

export interface UserRolePermissionsDto extends BaseDto {
  create: boolean,
  read: boolean,
  update: boolean,
  delete: boolean,
  approve: boolean
}
