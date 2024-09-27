import { v4 as uuidv4 } from 'uuid';
import { MenuItemDto } from "./menu-item.model";
import { BaseDto } from './base-dto.model';

export class MenuModel {
  constructor(
    id: string,
    orgId: string,
    title: string,
    children: MenuItemDto[],
  ) {
    this.id = id;
    this.orgId = orgId;
    this.title = title;
    this.children = children;
  }
  public id: string;
  public orgId: string;
  public title: string;
  public children: MenuItemDto[];

  public static emptyDto(): MenuModel {
    let date: any = new Date().toISOString();
    return {
      id: uuidv4().toString(),
      orgId: null,
      title: null,
      children: [],
    };
  }
}

export interface MenuDto extends BaseDto {
  id: string,
  orgId: string,
  title: string;
  children: MenuItemDto[],
}

// export class MenuItem {
//   constructor(
//     public id: number,
//     public pid: number,
//     public title: string,
//     public content: string,
//     public hasChild: boolean
//     ) {
      
//    }
// } 
