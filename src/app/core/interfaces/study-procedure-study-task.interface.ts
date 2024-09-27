export class StudyProcedureStudyTask {
  id: number;
  oid: string;
  study_task_id: number;
  study_task: studyTask;
}

interface studyTask {
  id: number;
  name: string;
  minute: number;
}
