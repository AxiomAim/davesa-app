import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { v4 as uuidv4 } from 'uuid';

export class DavesaVisitModel extends BaseDatabaseModel {

    constructor(
      id: string,
      studyId: string,
      sort: string,
      visit: string,
      dayMin: number,
      dayMax: number,
      window: number,
      type: string,
      description: string,
      created_at?: string,
      updated_at?: string,
      deleted_at?: string,

    ) {
        super();
        this.id = id;
        this.studyId = studyId;
        this.sort = sort;
        this.visit = visit;
        this.dayMin = dayMin;
        this.dayMax = dayMax;
        this.window = window;
        this.type = type;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public studyId: string;
    public sort: string;
    public visit: string;
    public dayMin: number;
    public dayMax: number;
    public window: number;
    public type: string;
    public description: string;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: DavesaVisitDto): DavesaVisitDto {
        const datetime = new Date().toISOString();
        return {
            id: dto.id,
            studyId: dto.studyId ? dto.studyId : null,
            sort: dto.sort ? dto.sort : null,
            visit: dto.visit ? dto.visit : null,
            dayMin: dto.dayMin ? dto.dayMin : null,
            dayMax: dto.dayMax ? dto.dayMax : null,
            window: dto.window ? dto.window : null,
            type: dto.type ? dto.type : null,
            description: dto.description ? dto.description : null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        };
    }

    public static emptyDto(): DavesaVisitDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            studyId: null,
            sort: null,
            visit: null,
            dayMin: null,
            dayMax: null,
            window: null,
            type: null,
            description: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }
}

export interface DavesaVisitDto extends BaseDto {
  id: string,
  studyId: string,
  sort: string,
  visit: string,
  dayMin: number,
  dayMax: number,
  window: number,
  type: string,
  description: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,

}


