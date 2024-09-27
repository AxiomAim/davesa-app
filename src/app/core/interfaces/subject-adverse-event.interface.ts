export interface SubjectAdverseEvent {
  id: number;
  oid: string;
  subject_oid: string;
  name: string;
  start_date: Date;
  end_date: Date;
  is_ongoing: boolean;
  is_serious: boolean;
  severity: number;
  related_to_drug: number;
  treatment: number;
  outcome: number;
  created_at: Date;
  updated_at: Date;
}
