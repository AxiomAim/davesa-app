
import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class SiteModel {

    constructor(
        id: string,
        orgId: string,
        sort: number,
        name: string,
        contact: string,
        description: string,
        address: string,
        city: string,
        state: string,
        zip: string,
        phone: string,
        email: string,   
        active: boolean,     
        created_at?: string,
        updated_at?: string,
        deleted_at?: string

    ) {
        this.id = id;
        this.orgId = orgId;
        this.sort = sort;
        this.name = name;
        this.contact = contact;
        this.description = description;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
        this.active = active;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;        

    }
    public id: string;
    public orgId: string;
    public sort: number;
    public name: string;
    public contact: string;
    public description: string;
    public address: string;
    public city: string;
    public state: string;
    public zip: string;
    public phone: string;
    public email: string;    
    public active: boolean;
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;    

    public static toDto(dto: SiteDto): SiteDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            sort: dto.sort ? dto.sort : null,
            name: dto.name ? dto.name : null,
            contact: dto.contact ? dto.contact : null,
            description: dto.description ? dto.description : null,
            address: dto.address ? dto.address : null,
            city: dto.city ? dto.city : null,
            state: dto.state ? dto.state : null,
            zip: dto.zip ? dto.zip : null,
            phone: dto.phone ? dto.phone : null,
            email: dto.email ? dto.email : null,
            active: dto.active ? dto.active : null,
            created_at: dto.created_at ? dto.created_at : null,
            updated_at: dto.updated_at ? dto.updated_at : null,
            deleted_at: dto.deleted_at ? dto.deleted_at : null
        };
    }

    public static emptyDto(): SiteDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            sort: null,
            name: null,
            contact: null,
            description: null,
            address: null,
            city: null,
            state: null,
            zip: null,
            phone: null,
            email: null,
            active: true,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null
        };
    }
}

export interface SiteDto extends BaseDto {
    id: string;
    orgId: string;
    sort: number;
    name: string;
    contact: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

