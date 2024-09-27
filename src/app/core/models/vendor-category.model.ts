import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class VendorCategoryModel {

    constructor(
        id: string,
        orgId: string,
        sort: number,
        name: string,
    
    ) {
        this.id = id;
        this.orgId = orgId;
        this.sort = sort;
        this.name = name;
    }
    public id: string;
    public orgId: string;
    public sort: number;
    public name: string;

    public static emptyDto(): VendorCategoryDto {
        let datetime: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            sort: 1,
            name: null,
        }
    }


    public static toDto(dto: VendorCategoryDto): VendorCategoryDto {
        let date: any = new Date().toISOString();

        return {
            id: dto.id,
            orgId: dto.orgId ? dto.orgId : null,
            sort: dto.sort ? dto.sort : 1,
            name: dto.name ? dto.name : null,
        };
    }

}

export interface VendorCategoryDto extends BaseDto {
    id: string,
    orgId: string,
    sort: number,
    name: string,
}


