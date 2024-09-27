export interface StudyPersonnelInvite {
  id: number;
  oid: string;
  study_id: number;
  user_id: number;
  status: boolean;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}
