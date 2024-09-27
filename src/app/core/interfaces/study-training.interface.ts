export interface StudyTraining {
  id: number;
  oid: string;
  study_id: number;
  study_oid: string;
  name: string;
  description: string;
  file_name: string;
  size: string;
  upload_url: string;
  onsite_onboarding: boolean;
  offsite_onboarding: boolean;
  is_active: boolean;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
  training_method_id?: number;
  url?: string;
}
