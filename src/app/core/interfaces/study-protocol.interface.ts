export interface StudyProtocol {
  id: number;
  oid: string;
  study_id: number;
  name: string;
  number: string;
  version: string;
  issue_date: Date;
  file_name: string;
  size: number;
  upload_url: string;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface StudyClinicalTrialAgreement {
  id: number;
  oid: string;
  study_id: number;
  name: string;
  date: Date;
  file_name: string;
  size: number;
  upload_url: string;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
  study: object;
}
