import { User } from '../pages/administration/users/user.model';
import { StudyTaskCredential } from './study-task-credential.interface';
import { StudyTaskTraining } from './studyTaskTraining.interface';

export interface StudyTask {
  task_id: number;
  id: number;
  oid: string;
  study_id: number;
  study_oid: string;
  name: string;
  type: string;
  created_by: number;
  updated_by: Date;
  created_at: number;
  updated_at: Date;
  credential: StudyTaskCredential[];
  credentials_and: StudyTaskCredential[];
  credentials_or: StudyTaskCredential[];
  trainings: StudyTaskTraining[];
  users: User[];
  site_account_delegation_role_id: number;
  site_account_delegation_role: any;
  minute: number;
  delegationRoles: any[];
  isGlobal?:boolean
}
