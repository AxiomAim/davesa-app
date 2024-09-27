import { UserDto } from "./user.model";

export class BaseSignatureModel {
    public role?: string;
    public signed?: boolean;
    public signed_at?: string;
    public signed_by?: UserDto;
}

export interface BaseSignatureDto {
    role: string;
    signed: boolean;
    signed_at: string;
    signed_by: UserDto;
}