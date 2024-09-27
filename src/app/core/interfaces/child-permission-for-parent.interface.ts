export interface ChildPermissionForParent {
    oid: string;
    study_delegation_role_user: StudyDelegationRoleUser;
}

interface StudyDelegationRoleUser {
    oid: string;
    study_delegation_role :{
        delegation_role_id: number;
        delegation_role_permission: DelegationRolePermission;
        delegation_role: {
            name: string;
            short_form: string;
        },
    },
    role_name: string;
}

interface DelegationRolePermission {
    oid: string;
    can_create: number;
    can_update: number;
    can_read: number;
    can_delete: number;
    can_approve: number;
    permission: PermissionDetail;
}

interface PermissionDetail {
    oid: string;
    name: string;
    type: string;
    permissions: Permission[];
}

interface Permission {
    oid: string;
    name: string;
    type: string;
    delegation_role_permission: PermissionActions;
}

interface PermissionActions {
    oid: string;
    can_create: number;
    can_update: number;
    can_read: number;
    can_delete: number;
    can_approve: number;
}
