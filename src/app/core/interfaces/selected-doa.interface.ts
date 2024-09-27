import { DelegationRole } from "./delegation-role.interface";

export interface SelectedDoa  {
    id: number,
    oid: string,
    delegation_role_id: number,
    delegation_role: DelegationRole,
    select_id: number,
    name: string,
    selected: boolean,
}
