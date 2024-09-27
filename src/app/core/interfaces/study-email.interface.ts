export interface StudyGroup {
  description: string;
  group_email: string;
  group_id: string;
  id: number;
  name: string;
  oid: string;
  study_id: number;
}

export interface StudyEmail{
  id: number;
  oid: string;
  subject: string;
  email_id: string;
  email_from: string;
  email_date: Date;
  attachments: string;
  message_body: string;
  snippet: string;
  created_at: Date;
}

export interface SyncStudyMails {
  id: string;
  threadId: string;
}

export interface StudyEmailConfig{
  id: number;
  oid: string;
  study_id: number;
  group_id: string;
  email: string;
  delivery_settings: string;
  member_key: string;
  user:{
    first_name: string;
    last_name: string;
  };
  first_name: string;
  last_name: string;
  userEmail: string;
}

export interface MailDetails{
  id: number;
  oid: string;
  subject: string;
  email_id: string;
  email_from: string;
  attachments: string;
  message_body:  string; 
  snippet: string;
  created_at: Date;
  email_Date?: Date;
}
