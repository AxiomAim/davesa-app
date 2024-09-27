import { SiteAccount } from './site-account.interface';
import { UserRole } from './user-role.interface';

export interface StudyPersonnelInviteAdd {
  id: number;
  oid: string;
  username: string;
  first_name: string;
  middle_name: number;
  last_name: number;
  email: string;
  suffix_name: string;
  site_account: SiteAccount;
  user_role: any;
}
