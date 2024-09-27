import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { UserDto } from './user.model';
import { SupportTicketDto } from './support-ticket.model';

export class ProjectSprintModel {
    constructor(
        id: string,
        orgId: string,
        name?: string,
        projectId?: string,
        ticketIds?: string[],
        tickets?: SupportTicketDto[],
        start_at?: string,
        end_at?: string,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
    ) {
        this.id = id;
        this.orgId = orgId;
        this.name = name;
        this.projectId = projectId;
        this.ticketIds = ticketIds;
        this.tickets = tickets;
        this.start_at = start_at;
        this.end_at = end_at;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public orgId: string;
    public name: string;
    public projectId: string;
    public ticketIds: string[];
    public tickets: SupportTicketDto[];
    public start_at: string;
    public end_at: string;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static emptyDto(): ProjectSprintDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            name: null,
            projectId: null,
            ticketIds: [],
            tickets: [],
            start_at: null,
            end_at: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        };
    }
}

export interface ProjectSprintDto extends BaseDto {
    id: string;
    orgId: string;
    name: string;
    projectId?: string;
    ticketIds?: string[];
    tickets?: SupportTicketDto[];
    user?: UserDto;
    start_at?: string;
    end_at?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

