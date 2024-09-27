export type FilterParams = {
  offset: number;
  limit: number;
  sort_field?: string;
  sort_direction?: "A" | "D" | "";
  query?: string;
  // extra
  study_oid?: string;
  subject_oid?: string;
  procedure_type?: string;
  type?: string;
  user_oid?: string;
  site_account_id?: string | number | undefined | null;
  user_role_id?: string | number;
  study_id?: string | number;
  visit_type?: string;
  module_type?: string;
  is_archived?: boolean;
  status?: string;
  doa_role?: string;
  study_delegation_role_id?: number;
  task_template_oid?: string;
  is_procedure?: boolean;
  organization_oid?: string;
  site_account_oid?: string;
  country_id?: number;
  state_id?: number;
};
