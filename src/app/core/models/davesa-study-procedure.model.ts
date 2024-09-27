import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { v4 as uuidv4 } from 'uuid';
import { StorageAssetDto } from './storage-asset.model';
import { UserDto } from './user.model';
import { OrgDto } from './org.model';
import { EsourceDto } from './esource.model';

export class DavesaStudyProcedureModel extends BaseDatabaseModel {

    constructor(
      id: string,
      studyId: string,
      sort: number,
      procedureName: string,
      procedureType: string,
      procedureDescription: string,
      tasks: DavesaStudyProcedureDto[],
      esource: EsourceDto[],
      created_at?: string,
      updated_at?: string,
      deleted_at?: string,
    ) {
        super();
        this.id = id;
        this.studyId = studyId;
        this.sort = sort;
        this.procedureName = procedureName;
        this.procedureType = procedureType;
        this.procedureDescription = procedureDescription;
        this.tasks = tasks;
        this.esource = esource;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public studyId: string;
    public sort: number;
    public procedureName: string;
    public procedureType: string;
    public procedureDescription: string;
    public tasks: DavesaStudyProcedureDto[];
    public esource: EsourceDto[];
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: DavesaStudyProcedureDto): DavesaStudyProcedureDto {
        const datetime = new Date().toISOString();
        return {
            id: dto.id,
            studyId: dto.studyId ? dto.studyId : null,
            sort: dto.sort ? dto.sort : null,
            procedureName: dto.procedureName ? dto.procedureName : null,
            procedureType: dto.procedureType ? dto.procedureType : null,
            procedureDescription: dto.procedureDescription ? dto.procedureDescription : null,
            tasks: dto.tasks ? dto.tasks : null,
            esource: dto.esource ? dto.esource : null,
            created_at: dto.created_at ? dto.created_at : datetime,
            updated_at: dto.updated_at ? dto.updated_at : datetime,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): DavesaStudyProcedureDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            studyId: null,
            sort: null,
            procedureName: null,
            procedureType: null,
            procedureDescription: null,
            tasks: null,
            esource: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }
}

export interface DavesaStudyProcedureDto extends BaseDto {
  id: string,
  studyId: string,
  sort: number,
  procedureName: string,
  procedureType: string,
  procedureDescription: string,
  tasks: DavesaStudyProcedureDto[],
  esource: EsourceDto[],
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
}


