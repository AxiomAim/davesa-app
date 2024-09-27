export interface SiteAccountDelegationROlePermission {
  id: number;
  oid: string;
  site_account_id: number;
  delegation_role_id: number;
  permission_id: number;
  site_account_delegation_role_id: number;
  can_create: number;
  can_read: number;
  can_update: number;
  can_delete: number;
  can_approve: number;
  created_at: Date;
}
