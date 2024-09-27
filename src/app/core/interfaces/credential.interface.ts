export interface Credential {
  id: number;
  oid: string;
  name: string;
  entity_data_id: number;
  document_type: string;
  entity_datum: EntityData;
  selected?: boolean;
}

interface EntityData {
  id: number;
  oid: string;
  entity_id: number;
  name: string;
  code: null;
  created_at: Date;
}
