import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { v4 as uuidv4 } from 'uuid';

export class DavesaStudyAssessmentModel extends BaseDatabaseModel {

    constructor(
      id: string,
      studyName: string,
      studyProtocolNumber: string,
      studyProtocolTitle: string,
      sponsorId: string,
      studyIndication: string,
      studyType: string,
      studyPhase: string,
      studyIsfType: string,
      studyIsfTemplate: string,
      created_at?: string,
      updated_at?: string,
      deleted_at?: string,

    ) {
        super();
        this.id = id;
        this.studyName = studyName;
        this.studyProtocolNumber = studyProtocolNumber;
        this.studyProtocolTitle = studyProtocolTitle;
        this.sponsorId = sponsorId;
        this.studyIndication = studyIndication;
        this.studyType = studyType;
        this.studyPhase = studyPhase;
        this.studyIsfType = studyIsfType;
        this.studyIsfTemplate = studyIsfTemplate;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public studyName: string;
    public studyProtocolNumber: string;
    public studyProtocolTitle: string;
    public sponsorId: string;
    public studyIndication: string;
    public studyType: string;
    public studyPhase: string;
    public studyIsfType: string;
    public studyIsfTemplate: string;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: DavesaStudyAssessmentDto): DavesaStudyAssessmentDto {
        const datetime = new Date().toISOString();
        return {
            id: dto.id,
            studyName: dto.studyName ? dto.studyName : null,
            studyProtocolNumber: dto.studyProtocolNumber ? dto.studyProtocolNumber : null,
            studyProtocolTitle: dto.studyProtocolTitle ? dto.studyProtocolTitle : null,
            sponsorId: dto.sponsorId ? dto.sponsorId : null,
            studyIndication: dto.studyIndication ? dto.studyIndication : null,
            studyType: dto.studyType ? dto.studyType : null,
            studyPhase: dto.studyPhase ? dto.studyPhase : null,
            studyIsfType: dto.studyIsfType ? dto.studyIsfType : null,
            studyIsfTemplate: dto.studyIsfTemplate ? dto.studyIsfTemplate : null,
            created_at: dto.created_at ? dto.created_at : datetime,
            updated_at: dto.updated_at ? dto.updated_at : datetime,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): DavesaStudyAssessmentDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            studyName: null,
            studyProtocolNumber: null,
            studyProtocolTitle: null,
            sponsorId: null,
            studyIndication: null,
            studyType: null,
            studyPhase: null,
            studyIsfType: null,
            studyIsfTemplate: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }
}

export interface DavesaStudyAssessmentDto extends BaseDto {
  id: string,
  studyName: string,
  studyProtocolNumber: string,
  studyProtocolTitle: string,
  sponsorId: string,
  studyIndication: string,
  studyType: string,
  studyPhase: string,
  studyIsfType: string,
  studyIsfTemplate: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
}


