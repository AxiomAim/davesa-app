export interface DelegationRolePermission {
  id?: number;
  oid?: string;
  delegation_role_id?: number;
  permission_id: number;
  can_create: number;
  can_read: number;
  can_update: number;
  can_delete: number;
  can_approve: number;
  created_at?: Date;
  updated_at?: Date;
  name?: string;
  permissions?: Permission;
  isAccessAllowed?: boolean;
  parent_id?:number;
}

interface Permission{
  created_at?: Date;
  id: number;
  name: string;
  oid: string;
  type: string;
}



