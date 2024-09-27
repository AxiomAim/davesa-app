import { ChatQueryType } from '../enum/chat-query-type.enum';

export type ChatModelRefType = {
  study_id: number;
  study_schedule_visit_id: number;
  type: ChatQueryType;
  subject_id: number;
  study_procedure_id: number | null;
  esource_form: any;
  notificationSubtitle: string;
};
