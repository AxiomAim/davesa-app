import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { UserDto } from './user.model';
import { SupportTicketDto } from './support-ticket.model';

export class ProjectBuildModel {
    constructor(
        id: string,
        orgId: string,
        name: string,
        projectId: string,
        major: number,
        minor: number,
        patch: number,
        build: number,
        ticketIds: string[],
        tickets: TicketDto[],
        user: UserDto,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        buildVersion?: string
    ) {
        this.id = id;
        this.orgId = orgId;
        this.name = name;
        this.projectId = projectId;
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.build = build;
        this.ticketIds = ticketIds;
        this.tickets = tickets;
        this.user = user;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
        this.buildVersion = buildVersion;
    }
    public id: string;
    public orgId: string;
    public name: string;
    public projectId: string;
    public major: number;
    public minor: number;
    public patch: number;
    public build: number;
    public ticketIds: string[];
    public tickets: TicketDto[];
    public user: UserDto;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;
    public buildVersion: string;

    public static emptyDto(): ProjectBuildDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            name: null,
            projectId: null,
            major: 1,
            minor: 0,
            patch: 0,
            build: 0,
            ticketIds: null,
            tickets: [],
            user: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
            buildVersion: null,
        };
    }
}

export interface ProjectBuildDto extends BaseDto {
    id: string;
    orgId: string;
    name: string;
    projectId: string;
    major: number;
    minor: number;
    patch: number;
    build: number;
    ticketIds: string[];
    tickets: TicketDto[];
    user: UserDto;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    buildVersion: string;
}

export interface TicketDto extends BaseDto {
    id: string;
    orgId: string;
    Id: string;
    Status: string;
    Summary: string;
    Type: string;
    Priority: string;
}
