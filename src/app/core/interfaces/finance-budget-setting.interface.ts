export interface StudyBudgetSetting {
  id?: string;
  oid?: string;
  study_id?: number;
  overhead: number;
  holdback: number;
  send_invoice: boolean;
  invoice_event: string;
  day_until_late: number;
  penalty_percentage: number;
  early_discount_percentage: number;
  discount_days: number;
  bank_account_id? :number;
}

export interface StudyBudgetLaborRate {
  id: string;
  oid: string;
  study_id: number;
  role_name: string;
  rate: number;
  delegation_role: string;
  delegation_role_id: number;
  delegation_role_short: string;
}

export interface StudyBudgetBankDetail {
  id: string;
  oid: string;
  bank_name: string;
}
