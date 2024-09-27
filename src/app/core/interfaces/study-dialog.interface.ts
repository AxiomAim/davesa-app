import { User } from "./user.interface";
import { DelegationRole } from "./delegation-role.interface";

export interface StudyDialog{
    oid: string;
    study_id: number;
    study_delegation_role_user: StudyDelegationRoleUser;
    study: {
        id: 1;
        name: string;
        number: string;
        created_at: Date;
    };
    pendingCount: number;
    number: string;
    created_at: Date
}

export interface StudyDelegationRoleUser {
    oid: string;
    id: number;
    study_id : number;
    study_invite_user_id: number;
    study_delegation_role_id: number;
    study_delegation_role: {
        id: number;
        oid: string;
        study_id?: number;
        delegation_role_id?: number;
        role_name?: string;
        created_by?: number;
        updated_by?: number;
        created_at?: Date;
        updated_at?: Date;
        delegation_role: DelegationRole
    };
    status?: string;
    active?: boolean | number;
    created_by?: number;
    updated_by?: number;
    created_at?: Date;
    study_invite_user?: {
        id: number;
        oid: string;
        study_id: number;
        user_id: number;
        start_date: Date;
        end_date: Date;
        is_deleted: number;
        deleted_reason: string;
        deleted_date: Date;
        rejoin_reason: string;
        created_by: number;
        updated_by: number;
        createdAt: Date;
        updatedAt: Date;
        user: User
    }
}