export interface SubjectMedicalHistory {
  id: number;
  oid: string;
  subject_oid: string;
  title: string;
  comment: string;
  description: string;
  status: string;
  upload_url: string;
  file_name: string;
  onset_date: string;
  resolved_date: string;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}
