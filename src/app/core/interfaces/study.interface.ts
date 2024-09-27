import { EntityData } from "./entity-data.interface";
import { SiteAccount } from "./site-account.interface";
import { StudyProtocol } from "./study-protocol.interface";
import { User } from "./user.interface";

export interface Study {
  id: number;
  oid: string;
  study_id?: number;
  site_account_id: number | null;
  name: string;
  nick_name: string;
  number: string;
  due_date: Date | null;
  schedule_type: string;
  sponsor: string;
  interval: number;
  sponsor_id: string;
  cro_id: string;
  irb_id: string;
  indication: string;
  site_number: string;
  supervisor_id: number | null;
  study_phase: string;
  study_type: string;
  study_timeline: Date;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
  user: User;
  protocol: StudyProtocol;
  site_account: SiteAccount;
  study_schedule_visits: any;
  sponsor_contact_info: contact_info_type;
  irb_contact_info: contact_info_type;
  cro_contact_info: contact_info_type;
  site_account_bank_detail: site_account_bank_detail;
  protocol_name: string;
  recruitment_status: string;
  checked?: boolean;
  status?: boolean | string;
  is_finance: boolean;
  site_initial_visit_date?: Date;
  isf_repository?: string;
  isf_type?: string;
  study_email_id?: string | null;
  is_group_create?: boolean;
  task_clone?: boolean;
  study_version_id: number;
  logo?: string | null;
  target_enrollment?: number;
  deleted?: boolean;
  deleted_by?: number;
  subject_enrolled_count?: number;
  subject_screening_count?: number;
  study_protocols?: StudyProtocols[];
  is_lock: number | boolean;
  is_global?: boolean;
}

export interface contact_info_type {
  id: number;
  oid: string;
  type: string;
  name: string;
}

export interface site_account_bank_detail {
  id: number;
  oid: string;
  bank_name: string;
  bank_address?: string;
  routing_number?: string;
  account_number?: string;
}

export interface StudyContacts {
  id: number;
  oid: string;
  study_id: number;
  first_name: string;
  last_name: string;
  p_country_code: number | null;
  phone: string;
  m_country_code: number | null;
  mobile: string | null;
  street_1: string | null;
  street_2: string | null;
  email: string;
  country_id: number | null;
  city_id: number | null;
  state_id: number | null;
  zip: string | null;
  category_id: number | null;
  description: string | null;
  created_by: number;
  created_at: Date;
  organization: string;
  job_title: string;
  entity_datum: EntityData;
  country: string | null;
  state: string | null;
  city: string | null;
  category: string;
}

interface StudyProtocols {
  name: string;
  number: string;
  version: string;
  issue_date: Date;
  file_name: string;
  size: string;
  upload_url: string;
}

export interface StudyVersion {
  id: number;
  oid: string;
  study_id: number;
  study_protocol_id: number | null;
  version: string;
  created_at: Date;
  created_by: number | null;
}
