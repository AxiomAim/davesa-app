import { VisitTypes } from "app/core/enum/visit-types.enum";

export interface Participant {
  id: number;
  oid: string;
  name: string;
  studyHistory?: StudyHistory[];
  preQualificationHistory?: PreQualificationHistory[];
  medicalHistroy?: MedicalHistory[];
  created_at: Date;
  subject_id: number;
  site_account_id: number;
  study_id: number;
  first_name: string;
  last_name: string;
  gender: number;
  current_address: string;
  permanent_address: string;
  city_id: number;
  state_id: number;
  postal_code: number;
  country_id: number;
  country_code: number;
  mobile_number: string;
  email: string;
  status: string;
  birth_date: Date;
  minor: boolean;
  guardian: string;
  subject_guardian_details: SubjectGuardianDetails[],
  study:Study ,
  subject_visits: SubjectVisits[],
  visits: SubjectVisits[],
  study_number: string;
  updated_at: Date;
}

interface Study{
  oid: string;
  number: string;
}
export interface SubjectGuardianDetails {
  name: string;
  mobile_number: string;
  email: string;
  id: number;
  countryCode: any;
}

interface SubjectVisits {
  oid: string;
  id: number;
  appointment_end_date: Date | undefined | null;
  appointment_start_date: Date | undefined | null;
  study_schedule_visit?: {
    name: string;
    window?: string | null;
    type: string | null;
    visit_type: string | null;
  }
  status: string;
  visit_name?: string;
  visit_type?: VisitTypes;
}

export interface StudyHistory {
  id: string;
  name?: string;
  description?: string;
  fileUrl?: string;
  created_at: Date;
}

export interface PreQualificationHistory {
  id: string;
  name?: string;
  description?: string;
  fileUrl?: string;
  created_at: Date;
}

export interface MedicalHistory {
  id: string;
  name?: string;
  description?: string;
  fileUrl?: string;
  created_at: Date;
}
