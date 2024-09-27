import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { v4 as uuidv4 } from 'uuid';
import { StorageAssetDto } from './storage-asset.model';
import { UserDto } from './user.model';

export class DavesaStudyTrainingModel extends BaseDatabaseModel {

    constructor(
      id: string,
      studyId: string,
      trainingName: string,
      trainingAttachment: StorageAssetDto[],
      trainingMethod: string,
      trainingStartDate: string,
      trainingEndDate: string,
      trainingUsers: UserDto[],
      isActive: boolean,
      created_at?: string,
      updated_at?: string,
      deleted_at?: string,
    ) {
        super();
        this.id = id;
        this.studyId = studyId;
        this.trainingName = trainingName;
        this.trainingAttachment = trainingAttachment;
        this.trainingMethod = trainingMethod;
        this.trainingStartDate = trainingStartDate;
        this.trainingEndDate = trainingEndDate;
        this.trainingUsers = trainingUsers;
        this.isActive = isActive;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public studyId: string;
    public trainingName: string;
    public trainingAttachment: StorageAssetDto[];
    public trainingMethod: string;
    public trainingStartDate: string;
    public trainingEndDate: string;
    public trainingUsers: UserDto[];
    public isActive: boolean;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: DavesaStudyTrainingDto): DavesaStudyTrainingDto {
        const datetime = new Date().toISOString();
        return {
            id: dto.id,
            studyId: dto.studyId ? dto.studyId : null,
            trainingName: dto.trainingName ? dto.trainingName : null,
            trainingAttachment: dto.trainingAttachment ? dto.trainingAttachment : [],
            trainingMethod: dto.trainingMethod ? dto.trainingMethod : null,
            trainingStartDate: dto.trainingStartDate ? dto.trainingStartDate : null,
            trainingEndDate: dto.trainingEndDate ? dto.trainingEndDate : null,
            trainingUsers: dto.trainingUsers ? dto.trainingUsers : [],
            isActive: dto.isActive ? dto.isActive : true,
            created_at: dto.created_at ? dto.created_at : datetime,
            updated_at: dto.updated_at ? dto.updated_at : datetime,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): DavesaStudyTrainingDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            studyId: null,
            trainingName: null,
            trainingAttachment: [],
            trainingMethod: null,
            trainingStartDate: null,
            trainingEndDate: null,
            trainingUsers: [],
            isActive: true,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }
}

export interface DavesaStudyTrainingDto extends BaseDto {
  id: string,
  studyId: string,
  trainingName: string,
  trainingAttachment: StorageAssetDto[],
  trainingMethod: string,
  trainingStartDate: string,
  trainingEndDate: string,
  trainingUsers: UserDto[],
  isActive: boolean,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
}


