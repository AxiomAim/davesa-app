import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './user.model';

export class EpicModel {

    constructor(
        id: string, 
        orgId: string, 
        rankId: number,
        name: string, 
        description: string, 
        keyField: string,
        headerText: string,
        value: string, 
        icon: string,
        maxCount: number,
        projectId: string, 
        createId: string, 
        ownerId: string, 
        color: string,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,        
        ) {
            this.id = id;
            this.orgId = orgId;
            this.rankId = rankId;
            this.name = name;
            this.description = description;
            this.keyField = keyField;
            this.headerText = headerText;
            this.value = value;
            this.icon = icon;
            this.maxCount = maxCount;
            this.projectId = projectId;
            this.createId = createId;
            this.ownerId = ownerId;
            this.color = color;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
    }
    public id:string;
    public orgId:string;
    public rankId:number;
    public name:string;
    public description: string;
    public keyField: string;
    public headerText: string;
    public value: string;
    public icon: string;
    public maxCount: number;
    public projectId: string;
    public createId: string;
    public ownerId: string;
    public color: string;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static emptyDto(): EpicDto {
        let date: any = new Date().toISOString(); 
        return {
            id: uuidv4().toString(),
            orgId: null,
            rankId: null,
            name: null,
            description: null,
            keyField: null,
            headerText: null,
            value: null,
            icon: null,
            maxCount: null,
            projectId: null,
            createId: null,
            ownerId: null,
            color: null,
            created_at: date,
            updated_at: date,
            deleted_at: '',
        }
    }

}

export interface EpicDto {
    id: string, 
    orgId: string, 
    rankId: number, 
    name: string, 
    description: string,
    keyField: string,
    headerText: string,
    value: string, 
    icon: string,
    maxCount: number,
    projectId: string,
    createId: string,
    ownerId: string,
    color: string,
    created_at?: string,
    updated_at?: string,
    deleted_at?: string,
}


