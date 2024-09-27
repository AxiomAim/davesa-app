import { VisitStatus } from 'app/core/enum/visit-status.enum';
import { VisitTypes } from 'app/core/enum/visit-types.enum';
import { StudyDelegationRoleUser } from './study-dialog.interface';
import { Subject, SubjectGuardianDetails } from './subject.interface';

export interface Visit {
  appointment_end_date: Date | undefined | null;
  appointment_start_date: Date | undefined | null;
  appointment_start_time: string | undefined | null;
  end_date: Date | undefined | null;
  start_date: Date | undefined | null;
  id: number;
  visit_id?: number;
  is_all_date_required: boolean;
  oid: string;
  status: VisitStatus;
  study: {
    id: number;
    name: string;
    nick_name: string;
    number: string;
    site_account_id: number;
    oid: string;
    is_finance: boolean;
    site_account: {
        site_name: string;
    },
    study_protocol_one: {
        number: string;
        version: number;
        issue_date: Date;
    },
    study_delegation_role_users: StudyDelegationRoleUser[];

  };
  subject_clinic:  SubjectClinic,
  study_id: number;
  study_schedule_visit:
    | {
        oid: string;
        name: string;
        type: string | null;
        visit_type: VisitTypes;
        subject_esource_forms?: any;
        window?: any;
      }
    | null
    | undefined;
  study_schedule_visit_id?: number;
  subject_id: number;
  visit_date: Date;
  visit_name: string;
  visit_type: VisitTypes;
  selectStartTime: boolean;
  selectEndTime: boolean;
  minDate: Date;
  minEndDate: Date;
  maxDate: Date;
  appointment: any;
  procedures: any;
  esource_form_values: any;
  subject_esource_forms?: any;
  location_type: string;
  message_type?: string;
  created_at?: Date;
  subject?: Subject;
  guardians?: SubjectGuardianDetails[];
  updated_by?: number;
}


interface SubjectClinic { 
  id: string;
  oid: string;
  subject_study_id : string;
  check_in_time: Date;
  check_out_time: Date;
  subject_visit_id: number;
  created_by: number;
  updated_by: number;
  createdAt: Date;
  updatedAt: Date;
}