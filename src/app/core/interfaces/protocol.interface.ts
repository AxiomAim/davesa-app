import { Study } from './study.interface';

export interface Protocol {
  id: number;
  oid: string;
  study_id: number;
  study_oid: string;
  upload_url: string;
  file_name: string;
  size: number;
  name: string;
  version: string;
  addendum_no: string;
  number: string;
  issue_date: Date;
  loaded_at: string;
  started_at: string;
  created_at: Date;
  effective_date: Date;
  is_icf: boolean;
  study: Study;
  is_finance?: boolean;
  enableAuditTrail?: boolean;
}
