import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from './base-dto.model';

export class MenuItemModel {
    constructor(
        id: string,
        orgId: string,
        sort: number,
        sortOrder: number,
        menuId: string,
        parentId: string,
        childId: string,
        projectId: string,
        rid: number,
        pid: number,
        title: string,
        content: string,
        isParent: string
    ) {
        this.id = id;
        this.orgId = orgId;
        this.sort = sort;
        this.sortOrder = sortOrder;
        this.menuId = menuId;
        this.parentId = parentId;
        this.childId = childId;
        this.projectId = projectId;
        this.rid = rid;
        this.pid = pid;
        this.title = title;
        this.content = content;
        this.isParent = isParent;
    }
    public id: string;
    public orgId: string;
    public sort: number;
    public sortOrder: number;
    public menuId: string;
    public parentId: string;
    public childId: string;
    public projectId: string;
    public rid: number;
    public pid: number;
    public title: string;
    public content: string;
    public isParent: string;
  
    public static emptyDto(): MenuItemDto {
        let date: any = new Date().toISOString(); 
        return {
            id: uuidv4().toString(),
            orgId: null,
            sort: 1,
            sortOrder: 1,
            menuId: null,
            parentId: null,
            childId: null,
            projectId: null,
            rid: null,
            pid: null,
            title: null,
            content: null,
            isParent: null,
        }
    }

    public static toDto(dto: MenuItemDto): MenuItemDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            sort: dto.sort,
            sortOrder: dto.sortOrder,
            menuId: dto.menuId,
            parentId: dto.parentId,
            childId: dto.childId,
            projectId: dto.projectId,
            rid: dto.rid,
            pid: dto.pid,
            title: dto.title,
            content: dto.content,
            isParent: dto.isParent
        };
    }

}

export interface MenuItemDto extends BaseDto {
    id: string,
    orgId: string,
    sort: number,
    sortOrder: number,
    menuId: string,
    parentId: string,
    childId: string,
    projectId: string,
    rid: number,
    pid: number,
    title: string,
    content: string,
    isParent: string
}

export interface ImageDto {
    id: number,
    name: string,
    imageUrl: string
}
  

