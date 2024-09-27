import { DelegationRolePermission } from "./delegation-role-permission.interface";

export interface OrganizationRolePermission{
    id: number;
    oid: string;
    name: string;
    short_form: string;
    is_paid: boolean;
    description: string;
    created_at: Date;
    organization_delegation_role?: OrganizationDelegationRole;
    permissions?: DelegationRolePermission;
}

interface OrganizationDelegationRole {
    id: number;
    oid: string;
    organization_id: number;
    delegation_role_id: number;
    created_at: Date;
}