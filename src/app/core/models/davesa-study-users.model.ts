import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { v4 as uuidv4 } from 'uuid';

export class DavesaStudyUserModel extends BaseDatabaseModel {

    constructor(
      id: string,
      studyId: string,
      userId: string,
      userRoleId: string,
      created_at?: string,
      updated_at?: string,
      deleted_at?: string,

    ) {
        super();
        this.id = id;
        this.studyId = studyId;
        this.userId = userId;
        this.userRoleId = userRoleId;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public studyId: string;
    public userId: string;
    public userRoleId: string;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: DavesaStudyUserDto): DavesaStudyUserDto {
        const datetime = new Date().toISOString();
        return {
            id: dto.id,
            studyId: dto.studyId ? dto.studyId : null,
            userId: dto.userId ? dto.userId : null,
            userRoleId: dto.userRoleId ? dto.userRoleId : null,
            created_at: dto.created_at ? dto.created_at : datetime,
            updated_at: dto.updated_at ? dto.updated_at : datetime,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): DavesaStudyUserDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            studyId: null,
            userId: null,
            userRoleId: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }
}

export interface DavesaStudyUserDto extends BaseDto {
  id: string,
  studyId: string,
  userId: string,
  userRoleId: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
}


