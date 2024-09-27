
import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from '../base-dto.model';

export class ApiAccountModel {

    constructor(
        id: string,
        name: string,
        role: number,
        email: string,
        birthDateMillisecondsSinceEpoch: number,
        adminKey: string
    ) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.email = email;
        this.birthDateMillisecondsSinceEpoch = birthDateMillisecondsSinceEpoch;
        this.adminKey = adminKey;        
    }
    public id: string;
    public name: string;
    public role: number;
    public email: string;
    public birthDateMillisecondsSinceEpoch: number;
    public adminKey: string;

    public static toDto(dto: ApiAccountDto): ApiAccountDto {
        return {
            id: dto.id,
            name: dto.name ? dto.name : null,
            role: dto.role ? dto.role : null,
            email: dto.email ? dto.email : null,
            birthDateMillisecondsSinceEpoch: dto.birthDateMillisecondsSinceEpoch ? dto.birthDateMillisecondsSinceEpoch : null,
            adminKey: dto.adminKey ? dto.adminKey : null
        };
    }

    public static emptyDto(): ApiAccountDto {
        return {
            id: uuidv4().toString(),
            name: null,
            role: null,
            email: null,
            birthDateMillisecondsSinceEpoch: null,
            adminKey: null
        };
    }
}

export interface ApiAccountDto extends BaseDto {
    id: string,
    name: string,
    role: number,
    email: string,
    birthDateMillisecondsSinceEpoch: number,
    adminKey: string
}

