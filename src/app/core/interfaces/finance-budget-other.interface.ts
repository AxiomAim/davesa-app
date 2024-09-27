export interface Triggers {
  id: number;
  name: string;
}

export interface TriggerEventsData {
  id?: string;
  oid?: string;
  study_id?: number;
  name: string;
  type: string;
  trigger_event_id: number;
  amount: number;
  overhead: boolean;
  holdback: boolean;
  taxable: boolean;
  trigger_event?: Triggers;
  trigger_event_name?: string;
}
