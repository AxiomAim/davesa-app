import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { CsvDocumentDto } from './csv-document.model';

export class CsvRecordModel {

    constructor(
        id: string,
        orgId: string,
        projectId: string,
        sort: number,
        name: string,
        description: string,
        isDocument: boolean,
        isSop: boolean,
        isTech: boolean,
        isReq: boolean,
        isProtocol: boolean,
        isCsv: boolean,
        csvDocuments: CsvDocumentDto[],
        created_at: string,
        updated_at: string,
        deleted_at: string        
    ) {
        this.id = id;
        this.orgId = orgId;
        this.projectId = projectId;
        this.sort = sort;
        this.name = name;
        this.description = description;
        this.isDocument = isDocument;
        this.isSop = isSop;
        this.isTech = isTech;
        this.isReq = isReq;
        this.isProtocol = isProtocol;
        this.isCsv = isCsv;
        this.csvDocuments = csvDocuments;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;

    }
    public id: string;
    public orgId: string;
    public projectId: string;
    public sort: number;
    public name: string;
    public description: string;
    public isDocument: boolean;
    public isSop: boolean;
    public isTech: boolean;
    public isReq: boolean;
    public isProtocol: boolean;
    public isCsv: boolean;
    public csvDocuments: CsvDocumentDto[];
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static emptyDto(): CsvRecordDto {
        let datetime: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            projectId: null,
            sort: 0,
            name: '',
            description: ' ',
            isDocument: false,
            isSop: false,
            isTech: false,
            isReq: false,
            isProtocol: false,
            isCsv: false,
            isTitle: false,
            csvDocuments: [],
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null            
        }
    }

    public static toDto(dto: CsvRecordDto): CsvRecordDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            projectId: dto.projectId,
            sort: dto.sort,
            name: dto.name,
            description: dto.description,
            isDocument: dto.isDocument,
            isSop: dto.isSop,
            isTech: dto.isTech,
            isReq: dto.isReq,
            isProtocol: dto.isProtocol,
            isCsv: dto.isCsv,
            isTitle: dto.isTitle,
            csvDocuments: dto.csvDocuments,
            created_at: dto.created_at,
            updated_at: dto.updated_at,
            deleted_at: dto.deleted_at,
        };
    }
    // public static toDto(dto: CsvRecordDto): CsvRecordDto {
    //     let date: any = new Date().toISOString();
    //     return {
    //         id: dto.id,
    //         orgId: dto.orgId,
    //         projectId: dto.projectId,
    //         sort: dto.sort,
    //         name: dto.name,
    //         description: dto.description,
    //         isDocument: dto.isDocument,
    //         isSop: dto.isSop,
    //         isTech: dto.isTech,
    //         isReq: dto.isReq,
    //         isProtocol: dto.isProtocol,
    //         isCsv: dto.isCsv,
    //         isTitle: dto.isTitle,
    //         csvDocuments: dto.csvDocuments,
    //         created_at: dto.created_at,
    //         updated_at: dto.updated_at,
    //         deleted_at: dto.deleted_at,            
    //     };
    // }

}

export interface CsvRecordDto extends BaseDto {
    id: string;
    orgId: string;
    projectId: string;
    sort: number;
    name: string;
    description: string;
    isDocument: boolean;
    isSop: boolean;
    isTech: boolean;
    isReq: boolean
    isProtocol: boolean;
    isCsv: boolean
    isTitle: boolean;
    csvDocuments: CsvDocumentDto[];
    created_at: string;
    updated_at: string;
    deleted_at: string;

}


