import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './user.model';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { EpicDto } from './epic.model';

export class ProjectModel {

    constructor(
        id: string, 
        ordId: string, 
        name: string, 
        description: string, 
        purpose?: string,
        benefits?: string,
        userCharacteristics?: string,
        operationsSupport?: string,
        developerGuidelines?: string,
        assumptionsContraints?: string,
        logo?: string,
        color?: string,
        active?: boolean,
        prefix?: string,
        start_at?: string,
        end_at?: string,
        owner_users?: UserDto[],
        project_users?: UserDto[],
        approve_users?: UserDto[],
        developer_users?: UserDto[],
        it_manager_users?: UserDto[],
        testing_users?: UserDto[],
        training_users?: UserDto[],
        validation_users?: UserDto[],
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,        
        epics?: EpicDto[],
        it_team?: UserDto[],
        it_exec?: UserDto[],
        qa_team?: UserDto[],
        qa_exec?: UserDto[],
        biz_exec?: UserDto[],
        ) {
        this.id = id;
        this.orgId = ordId;
        this.name = name;
        this.description = description;
        this.purpose = purpose;
        this.benefits = benefits;
        this.userCharacteristics = userCharacteristics;
        this.operationsSupport = operationsSupport;
        this.developerGuidelines = developerGuidelines;
        this.assumptionsContraints = assumptionsContraints;
        this.logo = logo;
        this.color = color;
        this.active = active;
        this.prefix = prefix;
        this.start_at = start_at;
        this.end_at = end_at;
        this.active = active;
        this.owner_users = owner_users;
        this.project_users = project_users;
        this.approve_users = approve_users;
        this.developer_users = developer_users;
        this.it_manager_users = it_manager_users;
        this.testing_users = testing_users;
        this.training_users = training_users;
        this.validation_users = validation_users;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
        this.epics = epics;
        this.it_team = it_team;
        this.it_exec= it_exec;
        this.qa_team= qa_team;
        this.qa_exec= qa_exec;
        this.biz_exec= biz_exec;
    }
    public id:string;
    public orgId:string;
    public name:string;
    public description: string;
    public purpose: string;
    public benefits: string;
    public userCharacteristics: string;
    public operationsSupport: string;
    public developerGuidelines: string;
    public assumptionsContraints: string;
    public logo: string;
    public color: string;
    public active: boolean;
    public prefix: string;
    public start_at: string;
    public end_at: string;
    public users: UserDto[];
    public owner_users: UserDto[];
    public project_users: UserDto[];
    public approve_users: UserDto[];
    public developer_users: UserDto[];
    public it_manager_users: UserDto[];
    public testing_users: UserDto[];
    public training_users: UserDto[];
    public validation_users: UserDto[];
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;
    public epics: EpicDto[];
    public it_team: UserDto[];
    public it_exec: UserDto[];
    public qa_team: UserDto[];
    public qa_exec: UserDto[];
    public biz_exec: UserDto[];

    public static toDto(dto: ProjectDto): ProjectDto {
        let date: any = new Date().toISOString(); 
        return {
            id: uuidv4().toString(),
            orgId: dto.orgId ? dto.orgId : null,
            name: dto.name ? dto.name : null,
            description: dto.description ? dto.description : null,
            purpose: dto.purpose ? dto.purpose : null,
            benefits: dto.benefits ? dto.benefits : null,
            userCharacteristics: dto.userCharacteristics ? dto.userCharacteristics : null,
            developerGuidelines: dto.developerGuidelines ? dto.developerGuidelines : null,
            operationsSupport: dto.operationsSupport ? dto.operationsSupport : null,
            assumptionsContraints: dto.assumptionsContraints ? dto.assumptionsContraints : null,
            logo: dto.logo ? dto.logo : null,
            color: dto.color ? dto.color : null,
            active: dto.active ? dto.active : true,
            prefix: dto.prefix ? dto.prefix : null,
            start_at: dto.start_at ? dto.start_at : null,
            end_at: dto.end_at ? dto.end_at : null,
            users: dto.users ? dto.users : [],
            owner_users: dto.owner_users ? dto.owner_users : [],
            project_users: dto.project_users ? dto.project_users : [],
            approve_users: dto.approve_users ? dto.approve_users : [],
            developer_users: dto.developer_users ? dto.developer_users : [],
            it_manager_users: dto.it_manager_users ? dto.it_manager_users : [],
            testing_users: dto.testing_users ? dto.testing_users : [],
            training_users: dto.training_users ? dto.training_users : [],
            validation_users: dto.validation_users ? dto.validation_users : [],
            created_at: dto.created_at ? dto.created_at : date,
            updated_at: dto.updated_at ? dto.updated_at : date,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }


    public static emptyDto(): ProjectDto {
        let date: any = new Date().toISOString(); 
        return {
            id: uuidv4().toString(),
            orgId: null,
            name: null,
            description: null,
            purpose: null,
            benefits: null,
            userCharacteristics: null,
            operationsSupport: null,
            developerGuidelines: null,
            assumptionsContraints: null,
            logo: 'assets/logo/logo.png',            
            color: null,
            active: true,
            prefix: null,
            start_at: null,
            end_at: null,
            users: [],
            owner_users: [],
            project_users: [],
            approve_users: [],
            developer_users: [],
            it_manager_users: [],
            testing_users: [],
            training_users: [],
            validation_users: [],
            created_at: date,
            updated_at: date,
            deleted_at: '',
            epics: [],
            it_team: [],
            it_exec: [],
            qa_team: [],
            qa_exec: [],
            biz_exec: [],
        }
    }

}

export interface ProjectDto extends BaseDto {
    id: string, 
    orgId: string, 
    name: string, 
    description: string,
    purpose?: string,
    benefits?: string,
    userCharacteristics?: string,
    developerGuidelines?: string,
    operationsSupport?: string,
    assumptionsContraints?: string,
    logo?: string,
    color?: string,
    active?: boolean,
    prefix?: string,
    start_at?: string,
    end_at?: string,
    users?: UserDto[],
    owner_users?: UserDto[],
    project_users?: UserDto[],
    approve_users?: UserDto[],
    developer_users?: UserDto[],
    it_manager_users?: UserDto[],
    testing_users?: UserDto[],
    training_users?: UserDto[],
    validation_users?: UserDto[],
    created_at?: string,
    updated_at?: string,
    deleted_at?: string,
    epics?: EpicDto[],
    it_team?: UserDto[],
    it_exec?: UserDto[],
    qa_team?: UserDto[],
    qa_exec?: UserDto[],
    biz_exec?: UserDto[],
}


