export interface VisitSetting {
  id: number;
  oid: string;
  study_id: number;
  study_oid: string;
  subject_oid: string;
  visit_type: string;
  visit_date: Date;
  study_schedule_visit_id: number;
  created_by: number;
  updated_by: number;
  createdAt: Date;
  updatedAt: Date;
}
