import { StudyDelegationRoleUser } from "./study-dialog.interface";
import { User } from "./user.interface";

export interface ChatGroup{
    chat_id: number;
    chat_oid: string;
    user_id: number;
    status: string;
    section_id: number;
    field_id: string;
    isSection: boolean;
    chat: Chat;
}

export interface Chat{
    oid: string;
    id: number;
    status: string;
    chat_id: number;
    name: string;
    field_id: string;
    section_id: number;
    created_at: Date;
    unReadCount: number;
    lastMessage: string;
}

export interface ChatNotification{
    count: number;
    socketId: string;
    lastMessage: {
        sender: {
            first_name: string;
            last_name: string;
            created_at: Date
        };
        text: string;
    };
    chat_thread_id: number;
    searchParams: {
        section_id: number;
        field_id: string;
    }
}

export interface ChatStatusLog{
    id: number;
    oid: string;
    chat_thread_id: number;
    user_id: number;
    status: string;
    created_at: Date;
    updated_at: Date;
    chat_thread:{
        name: string;
        chat_id: number;
    };
    study_invite_user:{
        user_id: number;
        study_id: number;
        id: number;
        study_delegation_role_user: StudyDelegationRoleUser
    };
    user: User;
}