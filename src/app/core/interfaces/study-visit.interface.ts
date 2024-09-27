import { StudyDelegationRoleUser } from "./study-dialog.interface";

export interface StudyVisit{
    id: number;
    oid: string;
    name: string;
    nick_name: string;
    number: string;
    supervisor_id: number;
    reschedule_visits_count: number;
    missed_visits_count: number;
    absent_visits_count: number;
    confirmed_visits_count: number;
    finished_visits_count: number;
    validated_visits_count: number;
    unconfirmed_visits_count: number;
    endorsed_visits_count: number;
    clinic_visits_count: number;
    review_visits_count: number;
    study_delegation_role_users: StudyDelegationRoleUser[]
}