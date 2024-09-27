import { DelegationRolePermission } from "./delegation-role-permission.interface";

export interface DelegationRole {
  id?: number;
  oid: string;
  name: string;
  short_form: string;
  description: string | null;
  created_at?: Date;
  created_by?: number;
  updated_at?: Date;
  updated_by?: number;
  is_paid?: boolean;
  organization_oid?: string;
  parent_id?: number;
  permissions?: DelegationRolePermission[];
  childData?: DelegationRolePermission[];
  isDeleted?: boolean;
}

export interface DelegationRolePermissions {
  oid: string;
  id: number;
  name: string;
  type: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  childData?: DelegationRolePermissions;
}
