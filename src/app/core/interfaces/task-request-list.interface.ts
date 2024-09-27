import { User } from "./user.interface";
import { DelegationRole } from "./delegation-role.interface";
import { Study } from "./study.interface";

export interface TaskRequestList{
    id: number;
    oid: string;
    user_status: string;
    doa_status: string;
    created_at: Date;
    updated_at: Date;
    study_task: StudyTask;
    user: User;
    study_delegation_role: {
        id: number;
        oid: string;
        study_id: number;
        role_name: string;
        delegation_role:DelegationRole;
        study: Study
    };
    name: string;
    task_id: number;
    user_name: string;
    user_action: string;
    study_number: string;
    role: string;
}

export interface StudyTask {
    task_id: number;
    id: number;
    oid: string;
    study_id: number;
    study_oid: string;
    name: string;
    type: string;   
}
  