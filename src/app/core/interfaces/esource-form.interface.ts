import { NotificationCategory } from "./notification-category.interface";
import { User } from "./user.interface";

export interface eSourceForm {
  id: number;
  oid: string;
  name: string;
  form_definition: JSON;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  study_id: number;
  old_form_data?: Object;
  restricted_study_delegation_roles?: JSON;
  form_data?: Object;
  site_account_id?: number;
  description?: string;
  is_active?: boolean;
  created_by?: number;
  updated_by?: number;
  user: User;
  category_id?: number;
  is_lock?: boolean;
  order_by?: number;
  status?: string
  title?: string;
  user_id?: number;
  subtitle?: string;
  link?: string;
  has_read?: boolean;
  model_id?: number;
  notification_category?:NotificationCategory;
}

export interface eSourceFormCategory {
  created_by?: number;
  created_at: Date;
  id: number;
  name: string;
  oid: string;
  updated_by?: number;
  esource_forms?: eSourceForm[]
}

export interface UpdateEsourceForm{
  responseData : eSourceForm[];
  userIds: number[];
}