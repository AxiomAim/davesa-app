export interface EntityData {
  id: number;
  oid: string;
  entity_id: number;
  name: string;
  code: string;
  created_at: Date;
  entity: Entity;
  isDeleted: boolean;
  entity_name?: string;
}

interface Entity {
  id: number;
  oid: string;
  name: string;
  is_locked: number;
  created_at: Date;
  created_by?: number;
}

export interface EditCreateEntity {
  name: string;
  oid?: string;
}

export interface EntityFilters {
  id: number;
  oid: string;
  name: string;
}

export interface EditCreateEntityData {
  entity_id: number;
  name: string;
  oid: string | null;
}
