import { contact_info_type } from './study.interface';

export interface BillableItem {
  amount: number;
  holdback_amount: number;
  id: number;
  name: string;
  oid: string;
  overhead_amount: number;
  study_id: number;
  taxable_amount: number;
  total_amount: number;
  is_archived: boolean;
  trigger_event: object;
  trigger_event_id: number;
  trigger_type?: string;
  created_at: Date;
}

export interface InvoiceList {
  amount: number;
  holdback_amount: number;
  id: number;
  oid: string;
  billed: string | boolean;
  invoice_no: string;
  paid: string;
  created_at?: Date;
  study?: InvoiceStudy;
  study_id?: number;
  study_number?: string;
  holdback: number;
  invoice_bill_url: string;
}

export interface InvoiceStudy {
  id: number;
  name: string;
  number: string;
  sponsor_contact_info: contact_info_type;
  sponsor_id: number;
}
