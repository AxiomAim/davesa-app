import { v4 as uuidv4 } from 'uuid';
import { EpicDto } from './epic.model';
import { SupportTicketPostDto, SupportTicketPostModel } from './support-ticket-post.model';
import { UserDto } from './user.model';

export class SupportTicketModel {
    constructor(
        id: string, 
        orgId: string, 
        projectId: string, 
        support_posts: SupportTicketPostDto[],
        epic?: string, 
        invoiceId?: string,         
        backlog?: boolean,
        Id?: string, 
        sid?: number, 
        Status?: string,
        Summary?: string,
        Type?: string,
        buildType?: string,
        Priority?: string,
        version?: string,
        Tags?: any,
        Estimate?: number,
        bill_hours?: number,
        effective_hours?: number,
        bill_rate?: number,
        effective_rate?: number,
        Assignee?: string,
        RankId?: number,
        userId?: string,
        userName?: string,        
        userEmail?: string,        
        studyId?: string,
        Epics?: EpicDto,
        StartDate?: string,
        EndDate?: string,
        Duration?: number,
        Progress?: number,
        Predecessor?: number,
        Children?: any[],
        isManual?: boolean,
        name?: string,
        description?: string,
        created_user?: string,
        created_userId?: string,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        open_at?: string,
        assign_userId?: string,
        assign_userName?: string,
        assign_userEmail?: string,
        closed?: boolean,
        closed_at?: string,
        closed_userId?: string,
        closed_userName?: string,
        notificationList?: UserDto[],
        build?: boolean,
        buildVersion?: string,
        counter?: number,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.projectId = projectId;
            this.support_posts = support_posts;
            this.epic = epic;
            this.invoiceId = invoiceId;
            this.backlog = backlog;
            this.Id = Id;
            this.sid = sid;
            this.Status = Status;
            this.Summary = Summary;
            this.Type = Type;
            this.buildType = buildType;
            this.Priority = Priority;
            this.version = version;
            this.Tags = Tags;
            this.Estimate = Estimate;
            this.bill_hours = bill_hours;
            this.effective_hours = effective_hours;
            this.bill_rate = bill_rate;
            this.effective_rate = effective_rate;
            this.Assignee = Assignee;
            this.RankId = RankId;
            this.userId = userId;
            this.userName = userName;
            this.userEmail = userEmail;
            this.studyId = studyId;
            this.Epics = Epics;
            this.StartDate = StartDate;
            this.EndDate = EndDate;
            this.Duration = Duration;
            this.Progress = Progress;
            this.Predecessor = Predecessor;
            this.Children = Children;
            this.isManual = isManual;
            this.name = name;
            this.description = description;
            this.created_user = created_user;
            this.created_userId = created_userId;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
            this.open_at = open_at;
            this.assign_userId = assign_userId;
            this.assign_userName = assign_userName;
            this.assign_userEmail = assign_userEmail;
            this.closed = closed;
            this.closed_at = closed_at;
            this.closed_userId = closed_userId;
            this.closed_userName = closed_userName;
            this.notificationList = notificationList;
            this.build = build;
            this.buildVersion = buildVersion;
            this.counter = counter;
    }
    public id: string;
    public orgId: string;
    public projectId: string;
    public support_posts: SupportTicketPostDto[];
    public epic: string;
    public invoiceId:string;
    public backlog: boolean;
    public Id: string;
    public sid: number;
    public Status:string;
    public Summary:string;
    public Type:string;
    public buildType: string;
    public Priority:string;
    public version: string;
    public Tags:string;
    public Estimate:number;
    public bill_hours:number;
    public effective_hours:number;
    public bill_rate:number;
    public effective_rate:number;
    public Assignee:string;
    public RankId:number;
    public userId: string;
    public userName: string;
    public userEmail: string;
    public studyId: string;
    public Epics: EpicDto;
    public StartDate: string;
    public EndDate: string;
    public Duration: number;
    public Progress: number;
    public Predecessor: number;
    public Children: any[];
    public isManual: boolean;
    public name: string;
    public description: string;
    public created_at: string;
    public created_user: string;
    public created_userId: string;
    public updated_at: string;
    public deleted_at: string;
    public open_at: string;
    public assign_userId: string;
    public assign_userName: string;
    public assign_userEmail: string;
    public closed: boolean;
    public closed_at: string;
    public closed_userId: string;    
    public closed_userName: string;    
    public notificationList: UserDto[];
    public build: boolean;
    public buildVersion: string;
    public counter: number;

    public static toDto(dto: SupportTicketDto): SupportTicketDto {
        let date: any = new Date().toISOString(); 

        return {
            id: dto.id,
            orgId: dto.orgId ? dto.orgId : null,
            projectId: dto.projectId ? dto.projectId : null,
            support_posts: dto.support_posts ? dto.support_posts : [],
            epic: dto.epic ? dto.epic : null,
            invoiceId: dto.invoiceId ? dto.invoiceId : null,
            backlog: dto.backlog ? dto.backlog : false,
            Id: dto.Id ? dto.Id : null,
            sid: dto.sid ? dto.sid : 0,
            Status: dto.Status ? dto.Status : 'Open',
            Summary: dto.Summary ? dto.Summary : null,
            Type: dto.Type ? dto.Type : 'Bug',
            buildType: dto.buildType ? dto.buildType : 'Build',
            Priority: dto.Priority ? dto.Priority : 'Low',
            version: dto.version ? dto.version : 'Patch',
            Tags: dto.Tags ? dto.Tags : null,
            Estimate: dto.Estimate ? dto.Estimate : 0,
            bill_hours: dto.bill_hours ? dto.bill_hours : 0,
            effective_hours: dto.effective_hours ? dto.effective_hours : 0,
            bill_rate: dto.bill_rate ? dto.bill_rate : 0,
            effective_rate: dto.effective_rate ? dto.effective_rate : 0,
            Assignee: dto.Assignee ? dto.Assignee : null,
            RankId: dto.RankId ? dto.RankId : 0,
            userId: dto.userId ? dto.userId : null,
            userName: dto.userName ? dto.userName : null,
            userEmail: dto.userEmail ? dto.userEmail : null,
            studyId: dto.studyId ? dto.studyId : '',
            Epics: dto.Epics ? dto.Epics : null,
            StartDate: dto.StartDate ? dto.StartDate : null,
            EndDate: dto.EndDate ? dto.EndDate : null,
            Duration: dto.Duration ? dto.Duration : null,
            Progress: dto.Progress ? dto.Progress : null,
            Predecessor: dto.Predecessor ? dto.Predecessor : null,
            Children: dto.Children ? dto.Children : [],
            isManual: dto.isManual ? dto.isManual : true,
            name: dto.name ? dto.name : null,
            description: dto.description ? dto.description : null,
            created_user: dto.created_user ? dto.created_user : null,
            created_userId: dto.created_userId ? dto.created_userId : null,
            created_at: dto.created_at ? dto.created_at : date,
            updated_at: dto.updated_at ? dto.updated_at : date,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): SupportTicketDto {
        let date: any = new Date().toISOString(); 
        return {
            id: uuidv4().toString().toString(),
            orgId: null,
            projectId: null,
            support_posts: [],
            epic: null,
            invoiceId: null,
            backlog: false,
            Id: null,
            sid: 0,
            Status: 'Open',
            Summary: null,
            Type: 'Bug',
            buildType: 'Build',
            Priority: 'Low',
            version: 'Patch',
            Tags: null,
            Estimate: 0,
            bill_hours: 0,
            effective_hours: 0,
            bill_rate: 0,
            effective_rate: 0,
            Assignee: null,
            RankId: 0,
            userId: null,
            userName: null,
            userEmail: null,
            studyId: '',
            Epics: null,
            StartDate: null,
            EndDate: null,
            Duration: null,
            Progress: null,
            Predecessor: null,
            Children: [],
            isManual: true,
            name: null,
            description: null,
            created_user: null,
            created_userId: null,
            created_at: date,
            updated_at: date,
            deleted_at: '',
            open_at: '',
            assign_userId: null,
            assign_userName: null,
            assign_userEmail: null,
            closed: false,
            closed_at: null,
            closed_userId: null,
            closed_userName: null,
            notificationList: [],
            build: false,
            buildVersion: null,
            counter: 0,
        }
    }

}

export interface SupportTicketDto {
    id: string, 
    orgId: string, 
    projectId: string, 
    support_posts: SupportTicketPostDto[],
    epic?: string, 
    invoiceId?: string, 
    backlog?: boolean, 
    Id?: string, 
    sid?: number, 
    Status?: string, 
    Summary?: string, 
    Type?: string, 
    buildType?: string,
    Priority?: string, 
    version?: string, 
    Tags?: string, 
    Estimate?: number, 
    bill_hours?: number, 
    effective_hours?: number, 
    bill_rate?: number, 
    effective_rate?: number, 
    Assignee?: string, 
    RankId?: number, 
    userId?: string,
    userName?: string, 
    userEmail?: string, 
    studyId?: string, 
    Epics?: EpicDto, 
    StartDate?: string, 
    EndDate?: string, 
    Duration?: number, 
    Progress?: number, 
    Predecessor?: number, 
    Children?: any[], 
    isManual?: boolean, 
    name?: string, 
    description?: string, 
    created_user?: string,
    created_userId?: string,
    created_at?: string,
    updated_at?: string,
    deleted_at?: string,
    open_at?: string,
    assign_userId?: string,
    assign_userName?: string,
    assign_userEmail?: string,
    closed?: boolean,
    closed_at?: string,
    closed_userId?: string,
    closed_userName?: string,
    notificationList?: UserDto[],
    build?: boolean,
    buildVersion?: string,
    counter?: number,
}


