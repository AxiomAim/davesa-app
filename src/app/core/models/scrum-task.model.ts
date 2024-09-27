import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { CsvSignatureDto, CsvSignatureModel } from './csv-signature.model';
import { UserDto } from './user.model';

export class ScrumTaskModel {

    constructor(
        id: string,
        orgId: string,
        projectId: string,
        parentId: string,
        dependencyId: string,
        taskId: string,
        buildId?: string,
        csvRequirementId?: string,
        csvHierarchId?: string,
        taskName?: string,
        status?: string,
        summary?: string,
        type?: string,
        buildType?: string,
        priority?: string,
        version?: string,
        startAt?: string,
        endAt?: string,
        duration?: number,
        progress?: number,
        work?: number,
        resources?: UserDto[],
        children?: ScrumTaskDto[],
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,    
    
    ) {
        this.id = id;
        this.orgId = orgId;
        this.projectId = projectId;
        this.parentId = parentId;
        this.dependencyId = dependencyId;
        this.taskId = taskId;
        this.buildId = buildId;
        this.csvRequirementId = csvRequirementId;
        this.csvHierarchId = csvHierarchId;
        this.taskName = taskName;
        this.status = status;
        this.summary = summary;
        this.type = type;
        this.buildType = buildType;
        this.priority = priority;
        this.version = version;        
        this.startAt = startAt;
        this.endAt = endAt;
        this.duration = duration;
        this.progress = progress;
        this.work = work;
        this.resources = resources;
        this.children = children;        
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;

    }
    public id: string;
    public orgId: string;
    public projectId: string;
    public parentId: string;
    public dependencyId: string;
    public taskId: string;
    public buildId?: string;
    public csvRequirementId: string;
    public csvHierarchId: string;
    public taskName: string;
    public status: string;
    public summary: string;
    public type: string;
    public buildType: string;
    public priority: string;
    public version: string;
    public startAt: string;
    public endAt: string;
    public duration: number;
    public progress: number;
    public work: number;
    public resources: UserDto[];
    public children: ScrumTaskDto[];
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;


    public static emptyDto(): ScrumTaskDto {
        let datetime: any = new Date().toISOString();
        let newprepared_by: CsvSignatureDto = CsvSignatureModel.emptyDto();
        return {
            id: uuidv4().toString(),
            orgId: null,
            projectId: null,
            parentId: null,
            dependencyId: null,
            taskId: null,     
            buildId: null,   
            csvRequirementId: null,
            csvHierarchId: null,        
            taskName: null,
            status: null,
            summary: null,
            type: null,
            buildType: null,
            priority: null,
            version: null,
            startAt: null,
            endAt: null,
            duration: null,
            progress: null,
            work: null,
            resources: [],
            children: [],            
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }


    public static toDto(dto: ScrumTaskDto): ScrumTaskDto {
        let date: any = new Date().toISOString();

        return {
            id: dto.id,
            orgId: dto.orgId ? dto.orgId : null,
            projectId: dto.projectId ? dto.projectId : null,
            parentId: dto.parentId ? dto.parentId : null,
            dependencyId: dto.dependencyId ? dto.dependencyId : null,
            taskId: dto.taskId ? dto.taskId : null,
            buildId: dto.buildId ? dto.buildId : null,
            csvRequirementId: dto.csvRequirementId ? dto.csvRequirementId : null,
            csvHierarchId: dto.csvHierarchId ? dto.csvHierarchId : null,
            taskName: dto.taskName ? dto.taskName : null,
            status: dto.status ? dto.status : null,
            summary: dto.summary ? dto.summary : null,
            type: dto.type ? dto.type : null,
            buildType: dto.buildType ? dto.buildType : null,
            priority: dto.priority ? dto.priority : null,
            version: dto.version ? dto.version : null,            
            startAt: dto.startAt ? dto.startAt : null,
            endAt: dto.endAt ? dto.endAt : null,
            duration: dto.duration ? dto.duration : null,
            progress: dto.progress ? dto.progress : null,
            work: dto.work ? dto.work : null,
            resources: dto.resources ? dto.resources : [],
            children: dto.children ? dto.children : [],            
            created_at: dto.created_at ? dto.created_at : date,
            updated_at: dto.updated_at ? dto.updated_at : date,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

}

export interface ScrumTaskDto extends BaseDto {
    id: string,
    orgId: string,
    projectId: string,
    parentId: string,
    dependencyId: string,
    taskId: string,
    buildId?: string,
    csvRequirementId?: string,
    csvHierarchId?: string,
    taskName?: string,
    status?: string,
    summary?: string,
    type?: string,
    buildType?: string,
    priority?: string,
    version?: string,
    startAt?: string,
    endAt?: string,
    duration?: number,
    progress?: number,
    work?: number,
    resources?: UserDto[],
    children?: ScrumTaskDto[],
    created_at?: string,
    updated_at?: string,
    deleted_at?: string,    

}


