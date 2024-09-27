import { StudyProcedureStudyTask } from './study-procedure-study-task.interface';

export interface StudyProcedure {
  id: number;
  oid: string;
  study_id: number;
  study_oid: string;
  name: string;
  type: string;
  description: string;
  amount: number;
  cost: number;
  contract_cost: number;
  studyTasks: StudyProcedureStudyTask[];
  esourceForms: any[];
  esource_form_id: number;
  study_procedure_esource_forms: any[];
  study_procedure_study_tasks: any[];
  module_type?: string;
}
