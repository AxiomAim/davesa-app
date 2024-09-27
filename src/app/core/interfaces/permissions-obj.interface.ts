import { User } from "./user.interface";

export interface PermissionsObj {
    isEdit?: boolean;
    isDelete?: boolean;
    isView?: boolean;
    isCreate?: boolean;
    isAccessAllowed?: boolean;
    isApprove?: boolean;
    current_delegation_role?: string;
    loginUser?: User;
}