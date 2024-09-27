export interface LoginData {
    id: number;
    oid: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    study_id: number;
    user_role: {
        id: number;
        name: string;
    };
    accessToken: string;
}