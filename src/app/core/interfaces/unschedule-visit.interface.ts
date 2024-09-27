export interface UnscheduleVisit {
  id: number;
  oid: string;
  study_oid: string;
  visit_name: string;
  visit_type: string;
  procedures: any;
  created_by: number;
  updated_by: number;
  createdAt: Date;
  updatedAt: Date;
}
