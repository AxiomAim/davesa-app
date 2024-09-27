export interface OrganizationUser {
    id: number;
    oid: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    created_at: Date;
    user_role: UserRole;
}

interface UserRole{
    role: {
        id: number;
        name: string;
    }
}