import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { v4 as uuidv4 } from 'uuid';
import { EsourceDto } from './esource.model';
import { DavesaStudyProcedureDto } from './davesa-study-procedure.model';
import { DavesaStudyTaskDto } from './davesa-study-task.model';

export class DavesaStudyEsourceModel extends BaseDatabaseModel {

    constructor(
      id: string,
      studyId: string,
      sort: number,
      tasks: DavesaStudyTaskDto[],
      procedures: DavesaStudyProcedureDto[],
      eSourceDuraction: number,
      esource: EsourceDto[],
      created_at?: string,
      updated_at?: string,
      deleted_at?: string,
    ) {
        super();
        this.id = id;
        this.studyId = studyId;
        this.sort = sort;
        this.tasks = tasks;
        this.procedures = procedures;
        this.eSourceDuraction = eSourceDuraction;
        this.esource = esource;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public studyId: string;
    public sort: number;
    public tasks: DavesaStudyTaskDto[];
    public procedures: DavesaStudyProcedureDto[];
    public eSourceDuraction: number;
    public esource: EsourceDto[];
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: DavesaStudyEsourceDto): DavesaStudyEsourceDto {
        const datetime = new Date().toISOString();
        return {
            id: dto.id,
            studyId: dto.studyId ? dto.studyId : null,
            sort: dto.sort ? dto.sort : null,
            tasks: dto.tasks ? dto.tasks : null,
            procedures: dto.procedures ? dto.procedures : null,
            eSourceDuraction: dto.eSourceDuraction ? dto.eSourceDuraction : null,
            esource: dto.esource ? dto.esource : null,
            created_at: dto.created_at ? dto.created_at : datetime,
            updated_at: dto.updated_at ? dto.updated_at : datetime,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): DavesaStudyEsourceDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            studyId: null,
            sort: null,
            tasks: null,
            procedures: [],
            eSourceDuraction: null,
            esource: [],
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }
}

export interface DavesaStudyEsourceDto extends BaseDto {
  id: string,
  studyId: string,
  sort: number,
  tasks: DavesaStudyTaskDto[],
  procedures: DavesaStudyProcedureDto[],
  eSourceDuraction: number,
  esource: EsourceDto[],
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
}


