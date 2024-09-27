import { TriggerEventsData } from "./finance-budget-other.interface";

export interface BudgetTemplate {
  id: number;
  oid: string;
  name: string;
  created_at: Date;
}

export interface ListTriggerEventsList {
  data: ListTriggerEvent[];
  message: string;
}

export interface ListTriggerEvent {
  id: number;
  name: string;
  oid: string;
}

export interface GetOneBudgetTemplate {
  budget_template_trigger_events: TriggerEventsData[];
  created_at: Date;
  id: number;
  name: string;
  oid: string;
}

export interface updateBudgetTemplatePayload
  extends createBudgetTemplatePayload {
  oid: string;
  remove_trigger_events: number[];
}

export interface createBudgetTemplatePayload {
  name: string;
  finance_trigger_events: TriggerEventsData[];
}
