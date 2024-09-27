import { SiteAccount } from './site-account.interface';
import { SiteAccountDelegationROlePermission } from './site-account-delegation-role-permission.interface';

export interface SiteAccountDelegationRole {
  id: number;
  oid: string;
  delegation_role_id: number;
  name: string;
  short_form: string;
  description: string;
  site_account_id: number;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
  delegation_role: SiteAccountDelegationRole;
  site_account: SiteAccount;
  site_name: string;
  permissions: SiteAccountDelegationROlePermission[];
}
