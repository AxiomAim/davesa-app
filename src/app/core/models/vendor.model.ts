import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class VendorModel {

    constructor(
        id: string,
        orgId: string,
        sort: number,
        category: string,
        name: string,
        account: string,
        description: string,
        phone: string,
        email: string,
        userName: string,
        password: string,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,    
    
    ) {
        this.id = id;
        this.orgId = orgId;
        this.sort = sort;
        this.category = category;
        this.name = name;
        this.account = account;
        this.description = description;
        this.phone = phone;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;

    }
    public id: string;
    public orgId: string;
    public sort: number;
    public category: string;
    public name: string;
    public account: string;
    public description: string;
    public phone: string;
    public email: string;
    public userName: string;
    public password: string;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static emptyDto(): VendorDto {
        let datetime: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            sort: 1,
            category: null,
            name: null,
            account: null,
            description: null,
            phone: null,
            email: null,
            userName: null,
            password: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }


    public static toDto(dto: VendorDto): VendorDto {
        let date: any = new Date().toISOString();

        return {
            id: dto.id,
            orgId: dto.orgId ? dto.orgId : null,
            sort: dto.sort ? dto.sort : 1,
            category: dto.category ? dto.category : null,
            name: dto.name ? dto.name : null,
            account: dto.account ? dto.account : null,
            description: dto.description ? dto.description : null,
            phone: dto.phone ? dto.phone : null,
            email: dto.email ? dto.email : null,
            userName: dto.userName ? dto.userName : null,
            password: dto.password ? dto.password : null,
            created_at: dto.created_at ? dto.created_at : date,
            updated_at: dto.updated_at ? dto.updated_at : date,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

}

export interface VendorDto extends BaseDto {
    id: string,
    orgId: string,
    sort: number,
    category: string,
    name: string,
    account: string,
    description: string,
    phone: string,
    email: string,
    userName: string,
    password: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
}


