import { UserRole } from "./user.interface";

export interface GoogleUserProfile {
    token:Token;
    profile:Profile;
}

export interface GoogleUserProfileUserRole {
    googleToken:string;
    token: Token;
    type: string;
    user_roles: UserRole[];
    username:string;
}

interface Token {
    access_token: string;
    scope: string;
    token_type: string;
    id_token: string;
    expiry_date: number;
}


interface Profile {
    emailAddress: string;
    messagesTotal: number;
    threadsTotal: number;
    historyId: number
}
