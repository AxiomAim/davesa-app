export interface TasksTemplate {
  id: number;
  name: string;
  created_at: Date;
  oid: string;
  tasks?: Task[];
}

export interface CreateTaskTemplate {
  name: string;
  credentials_and?: number[];
  credentials_or?: number[];
  minute?: number;
  task_id?: string;
  type?: string;
  task_template_oid?: string;
}

export interface UpdateTaskTemplate extends CreateTaskTemplate {
  oid: string;
}

export interface Task {
  id: number;
  oid: string;
  name: string;
  task_id: string;
  type: string;
  minute: number;
  order_by: number | null;
  created_by: number;
  task_credentials?: TaskCredentials[];
}

export interface TaskCredentials {
  id: number;
  task_id: number;
  credential_id: number;
  type: string;
  credential: Credentials[];
}

export interface Credentials {
  id: number;
  oid: string;
  name: string;
  entity_data_id: number;
  created_at: Date;
}

export interface TaskList extends Task {
  task_template_id: number;
  created_at: Date;
  credential: {
    id: number;
    oid: string;
    task_id: number;
    credential_id: number;
    type: string;
    created_by: number;
    updated_by: number | null;
    created_at: Date;
    credential: Credentials;
  };
}

export interface TaskReorderPayload {
  taskList: TaskOrderId[];
}

export interface TaskOrderId {
  order: number;
  id: number;
}
