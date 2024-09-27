import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { v4 as uuidv4 } from 'uuid';;

export class DavesaStudyTaskModel extends BaseDatabaseModel {

    constructor(
      id: string,
      studyId: string,
      sort: number,
      taskId: string,
      taskName: string,
      taskType: string,
      taskDuration: number,
      created_at?: string,
      updated_at?: string,
      deleted_at?: string,
    ) {
        super();
        this.id = id;
        this.studyId = studyId;
        this.sort = sort;
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskType = taskType;
        this.taskDuration = taskDuration;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public studyId: string;
    public sort: number;
    public taskId: string;
    public taskName: string;
    public taskType: string;
    public taskDuration: number;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: DavesaStudyTaskDto): DavesaStudyTaskDto {
        const datetime = new Date().toISOString();
        return {
            id: dto.id,
            studyId: dto.studyId ? dto.studyId : null,
            sort: dto.sort ? dto.sort : null,
            taskId: dto.taskId ? dto.taskId : null,
            taskName: dto.taskName ? dto.taskName : null,
            taskType: dto.taskType ? dto.taskType : null,
            taskDuration: dto.taskDuration ? dto.taskDuration : null,
            created_at: dto.created_at ? dto.created_at : datetime,
            updated_at: dto.updated_at ? dto.updated_at : datetime,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): DavesaStudyTaskDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            studyId: null,
            sort: null,
            taskId: null,
            taskName: null,
            taskType: null,
            taskDuration: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }
}

export interface DavesaStudyTaskDto extends BaseDto {
  id: string,
  studyId: string,
  sort: number,
  taskId: string,
  taskName: string,
  taskType: string,
  taskDuration: number,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
}


