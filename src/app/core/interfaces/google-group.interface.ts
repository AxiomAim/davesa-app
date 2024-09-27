import { StudyDelegationRoleUser } from "./study-dialog.interface";
import { User } from "./user.interface";

export interface GoogleGroup{
    kind: string;
    id: string;
    etag: string;
    email: string;
    name: string;
    description: string;
    adminCreated: boolean;
    group_gmail?: string;
    study_oid?: string;
}

export interface GoogleGroupMember{
    delivery_settings?: string;
    oid?: string;
    study_oid: string;
    members?:Members[];
}

export interface Members {
    user_id: number;
    role: string;
    email: string;
}

export interface MemberList{
    id: number;
    oid: string;
    study_id: number;
    user_id: number;
    start_date: Date;
    end_date: Date;
    is_deleted: number;
    created_by: number;
    created_at: Date;
    user:User;
    study_delegation_role_user: StudyDelegationRoleUser;
    first_name: string;
    last_name: string;
    userEmail: string;
    delegation_role:string;
}