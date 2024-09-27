import { CountryStateCity } from "./country-state-city.interface";
import { SiteAccount } from "./site-account.interface";
import { StudyDelegationRoleUser } from "./study-dialog.interface";

export class User {
  oid: string;
  user_id: string;
  status: string;
  username: string;
  middle_name: string;
  first_name: string;
  last_name: string;
  password: string;
  prefix_name: number;
  suffix_name: string | null;
  email: string;
  role_id: number;
  entity_complience_id: number | null;
  entity_specialty_id: number | null;
  user_role_id: number;
  designation: string;
  active: number | string | boolean;
  mobile_phone: string;
  office_phone: string;
  address: string | null;
  office_city: string;
  office_postalcode: string | null;
  state_id: number;
  country_id: number;
  city_id: number;
  profile_img_url: string | null;
  study_task_oid: string;
  userCredentials: any[];
  site_account_id: number | null;
  user_site_accounts: any[];
  user_role: UserRole;
  site_account: SiteAccount | null;
  state: CountryStateCity;
  country: CountryStateCity;
  city: CountryStateCity;
  country_code: number;
  user_roles?: any[];
  user_delegation_role?: any[];
  study_delegation_role_users: StudyDelegationRoleUser[];
  subject_log?: string;
  study_invite_users?: StudyInviteUser[];
  created_at?: Date;
  accessToken?: string;
}

interface StudyInviteUser {
  oid: string;
  study_delegation_role_user: StudyDelegationRoleUser;
}

export interface UserRole {
  role_id: number;
  role: {
    name: string;
  };
  user_id?: number;
}

export interface UserEntities {
  id: number;
  oid?: string;
  name: string;
  is_locked?: number;
  entityData?: EntityData[];
}

export interface UserEntityAndRoles extends UserEntities {
  userRole?: {
    id: number;
    oid: string;
    name: string;
    created_at: Date;
  }[];
}

export interface EntityData {
  id: number;
  name: string;
}

export interface CreateEditUserPayload {
  oid?: string;
  username: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  active: boolean;
  entity_specialty_id: number | null;
  entity_complience_id: number | null;
  suffix_name: number;
  mobile_phone: string;
  address: string;
  office_postalcode: number;
  state_id: number;
  country_id: number;
  city_id: number;
  site_account_id: number[];
  prefix_name: number;
  country_code: number;
  user_roles: number[];
  user_delegation_roles: number[];
}