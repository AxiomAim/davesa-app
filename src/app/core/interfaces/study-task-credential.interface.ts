export interface StudyTaskCredential {
  id: number;
  oid: string;
  study_task_id: number;
  task_id?:number;
  credential_id: number;
  type?: string;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
  credential: any;
}
