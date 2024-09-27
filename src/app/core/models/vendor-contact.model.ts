import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class VendorContactModel {

    constructor(
        id: string,
        orgId: string,
        vendorId: string,
        sort: number,
        primary: boolean,
        name: string,
        title: string,
        email: string,
        description: string,
        address: string,
        phone: string,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,    
    
    ) {
        this.id = id;
        this.orgId = orgId;
        this.vendorId = vendorId;
        this.sort = sort;
        this.primary = primary;
        this.name = name;
        this.title = title;
        this.email = email;
        this.description = description;
        this.address = address;
        this.phone = phone;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;

    }
    public id: string;
    public orgId: string;
    public vendorId: string;
    public sort: number;
    public primary: boolean;
    public name: string;
    public title: string;
    public email: string;
    public description: string;
    public address: string;
    public phone: string;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static emptyDto(): VendorContactDto {
        let datetime: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            vendorId: null,
            sort: 1,
            primary: false,
            name: null,
            title: null,
            email: null,
            description: null,
            address: null,
            phone: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }


    public static toDto(dto: VendorContactDto): VendorContactDto {
        let date: any = new Date().toISOString();

        return {
            id: dto.id,
            orgId: dto.orgId ? dto.orgId : null,
            vendorId: dto.vendorId ? dto.vendorId : null,
            sort: dto.sort ? dto.sort : 1,
            primary: dto.primary ? dto.primary : false,
            name: dto.name ? dto.name : null,
            title: dto.title ? dto.title : null,
            email: dto.email ? dto.email : null,
            description: dto.description ? dto.description : null,
            address: dto.address ? dto.address : null,
            phone: dto.phone ? dto.phone : null,
            created_at: dto.created_at ? dto.created_at : date,
            updated_at: dto.updated_at ? dto.updated_at : date,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

}

export interface VendorContactDto extends BaseDto {
    id: string,
    orgId: string,
    vendorId: string,
    sort: number,
    primary: boolean,
    name: string,
    title: string,
    email: string,
    description: string,
    address: string,
    phone: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,

}


