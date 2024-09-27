export interface Training {
  id: number;
  oid: string;
  name: string;
  version_number: string;
  version_date: Date;
  issue_date: Date;
  expiration_date: Date;
  credential_id: number;
  no_expiration: boolean;
  onsite_onboarding: boolean;
  offsite_onboarding: boolean;
  is_active: boolean;
  status: string;
}
