export interface Organization {
  id: number;
  oid: string;
  name: string;
  created_at?: Date;
  db_name: string;
  description: string;
  domain: string;
  end_date: Date;
  has_access: boolean;
  renew_date: Date;
  start_date: Date;
  trial_days: number;
  current_seats?: number;
  paid_seats?: number;
  quickbook?: boolean;
}
