import { v4 as uuidv4 } from 'uuid';

export class PasswordModel {
  constructor(
    id: string,
    orgId: string,
    account: string,
    userName: string,
    password: string,
    url: string,
    category?: string,
    created_at?: string,
    created_by?: string,
    updated_at?: string,
    updated_by?: string,
    deleted_at?: string,
  ) {
    this.id = id;
    this.orgId = orgId;
    this.account = account;
    this.userName = userName;
    this.password = password;
    this.url = url;
    this.category = category;
    this.created_at = created_at;
    this.created_by = created_by;
    this.updated_at = updated_at;
    this.updated_by = updated_by;
    this.deleted_at = deleted_at;
  }
  public id: string;
  public orgId: string;
  public account: string;
  public userName: string;
  public password: string;
  public url: string;
  public category: string;
  public created_by?: string;
  public created_at?: string;
  public updated_by?: string;
  public updated_at?: string;
  public deleted_at?: string;

  public static emptyDto(): PasswordDto {
    let date: any = new Date().toISOString(); 
    return {
        id: uuidv4().toString(),
        orgId: null,
        account: null,
        userName: null,
        password: null,
        url: null,
        category: null,
        created_by: null,
        created_at: date,
        updated_by: null,
        updated_at: date,
        deleted_at: null,
    }
}

}

export interface PasswordDto {
  id: string;
  orgId: string;
  account: string;
  userName: string;
  password: string;
  url: string;
  category: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_at: string;
}
