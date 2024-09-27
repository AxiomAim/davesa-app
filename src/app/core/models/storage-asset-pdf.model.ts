import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './user.model';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class StoragePDFAssetModel {

    constructor(
        id: string,
        orgId: string,
        sort?: number,
        name?: string,
        pdfUrl?: string
    
    ) {
        this.id = id;
        this.orgId = orgId;
        this.sort = sort;
        this.name = name;
        this.pdfUrl = pdfUrl;
    }
    public id: string;
    public orgId: string;
    public sort: number;
    public name: string;
    public pdfUrl: string;


    public static emptyDto(): StoragePDFAssetDto {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            sort: null,
            name: null,
            pdfUrl: null
        }
    }

    public static toDto(dto: StoragePDFAssetDto): StoragePDFAssetDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            sort: dto.sort ? dto.sort : 1,
            name: dto.name ? dto.name : null,
            pdfUrl: dto.pdfUrl ? dto.pdfUrl : null,
        };
    }

}

export interface StoragePDFAssetDto extends BaseDto {
    id: string,
    orgId: string,
    sort?: number,
    name?: string,
    pdfUrl?: string
}

