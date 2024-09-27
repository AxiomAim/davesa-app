import { v4 as uuidv4 } from 'uuid';
import { MenuItemDto } from "./menu-item.model";
import { BaseDto } from './base-dto.model';

export class UserRoleModel {
  constructor(
    id: string,
    sort: number,
    name: string,
    isCreate: boolean,
    isRead: boolean,
    isUpdate: boolean,
    isDelete: boolean,
    isApprove: boolean,
    created_at: string,
    updated_at: string,
    deleted_at: string,

  ) {
    this.id = id;
    this.sort = sort;
    this.name = name;
    this.isCreate = isCreate;
    this.isRead = isRead;
    this.isUpdate = isUpdate;
    this.isDelete = isDelete;
    this.isApprove = isApprove;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;

  }
  public id: string;
  public sort: number;
  public name: string;
  public isCreate: boolean;
  public isRead: boolean;
  public isUpdate: boolean;
  public isDelete: boolean;
  public isApprove: boolean;
  public created_at: string;
  public updated_at: string;
  public deleted_at: string;

  public static emptyDto(): UserRoleDto {
    let datetime: any = new Date().toISOString();
    return {
        id: uuidv4().toString(),
        sort: 1,
        name: null,
        isCreate: false,
        isRead: false,
        isUpdate: false,
        isDelete: false,
        isApprove: false,
        created_at: datetime,
        updated_at: datetime,
        deleted_at: null,
    }
}


public static toDto(dto: UserRoleDto): UserRoleDto {
    let date: any = new Date().toISOString();

    return {
        id: dto.id,
        sort: dto.sort? dto.sort : 1,
        name: dto.name ? dto.name : null,
        isCreate: dto.isCreate? dto.isCreate : false,
        isRead: dto.isRead? dto.isRead : false,
        isUpdate: dto.isUpdate? dto.isUpdate : false,
        isDelete: dto.isDelete? dto.isDelete : false,
        isApprove: dto.isApprove? dto.isApprove : false,
        created_at: dto.created_at ? dto.created_at : date,
        updated_at: dto.updated_at ? dto.updated_at : date,
        deleted_at: dto.deleted_at ? dto.deleted_at : null,
    };
}

}

export interface UserRoleDto extends BaseDto {
  id: string,
  sort: number,
  name: string;
  isCreate: boolean,
  isRead: boolean,
  isUpdate: boolean,
  isDelete: boolean,
  isApprove: boolean,
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
