import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { CsvSignatureDto, CsvSignatureModel } from './csv-signature.model';
import { EsourceDto } from './esource.model';
import { EsourceDataDto } from './esource-data.model';

export class CsvDocumentModel {

    constructor(
        id: string,
        sort: number,
        object: string,
        objectId: string,
        orgId: string,
        projectId: string,
        documentUrl?: string,
        version?: number,
        active?: boolean,
        name?: string,
        reason?: string,
        description?: string,
        rationale?: string,
        thumbnail?: string,
        prepared_by?: CsvSignatureDto,
        prepared_at?: string,
        revision_by?: CsvSignatureDto,
        revision_description?: string,
        revision_at?: string,
        pre_approved_by?: CsvSignatureDto[], 
        approved_by?: CsvSignatureDto[], 
        read_by?: CsvSignatureDto[],
        eSources?: EsourceDto[],
        eSourceData?: EsourceDataDto[],
        requested_at?: string,
        requested_by?: CsvSignatureDto,
        requested_type?: string,
        effective_at?: string,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,        
    ) {
        this.id = id;
        this.sort = sort;
        this.object = object;
        this.objectId = objectId;
        this.orgId = orgId;
        this.projectId = projectId;
        this.documentUrl = documentUrl;
        this.version = version;
        this.active = active;
        this.name = name;
        this.reason = reason;
        this.description = description;
        this.rationale = rationale;
        this.thumbnail = thumbnail;
        this.prepared_by = prepared_by;
        this.prepared_at = prepared_at;
        this.revision_by = revision_by;
        this.revision_description = revision_description;
        this.revision_at = revision_at;
        this.pre_approved_by = pre_approved_by;
        this.approved_by = approved_by;
        this.read_by = read_by;
        this.eSources = eSources;
        this.eSourceData = eSourceData;
        this.requested_at = requested_at;
        this.requested_by = requested_by;
        this.requested_type = requested_type;
        this.effective_at = effective_at;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;        
    }
    public id: string;
    public sort: number;
    public object: string;
    public objectId: string;
    public orgId: string;
    public projectId: string;
    public documentUrl?: string;
    public version?: number;
    public active?: boolean;
    public name?: string;
    public reason?: string;
    public description?: string;
    public rationale?: string;
    public thumbnail?: string;
    public prepared_by: CsvSignatureDto;
    public prepared_at: string;
    public revision_by?: CsvSignatureDto;
    public revision_description?: string;
    public revision_at?: string;
    public pre_approved_by?: CsvSignatureDto[];
    public approved_by?: CsvSignatureDto[];
    public read_by?: CsvSignatureDto[];
    public eSources?: EsourceDto[];
    public eSourceData?: EsourceDataDto[];
    public requested_at?: string;
    public requested_by?: CsvSignatureDto;
    public requested_type?: string;
    public effective_at?: string;
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    public static emptyDto(): CsvDocumentDto {
        let datetime: any = new Date().toISOString();
        let prepared_by: CsvSignatureDto = CsvSignatureModel.emptyDto();
        let requested_by: CsvSignatureDto = CsvSignatureModel.emptyDto();
        let revision_by: CsvSignatureDto = CsvSignatureModel.emptyDto();
        return {
            id: uuidv4().toString(),
            sort: 1,
            object: null,
            objectId: null,
            orgId: null,
            projectId: null,
            documentUrl: null,
            version: null,
            active: false,
            name: null,
            reason: null,
            description: null,
            rationale: null,
            thumbnail: null,
            prepared_by: prepared_by,
            prepared_at: null,
            revision_by: revision_by,
            revision_description: '  ',
            revision_at: null,
            pre_approved_by: [],
            approved_by: [],
            read_by: [],
            eSources: [],
            eSourceData: [],
            requested_at: null,
            requested_by: requested_by,
            requested_type: null,
            effective_at: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }

    public static toDto(dto: CsvDocumentDto): CsvDocumentDto {
        let datetime: any = new Date().toISOString();
        let requested_by: CsvSignatureDto = CsvSignatureModel.emptyDto();
        let revision_by: CsvSignatureDto = CsvSignatureModel.emptyDto();
        return {
            id: dto.id ? dto.id : uuidv4().toString(),
            sort: dto.sort ? dto.sort : 1,
            object: dto.object ? dto.object : null,
            objectId: dto.objectId ? dto.objectId : null,
            orgId: dto.orgId ? dto.orgId : null,
            projectId: dto.projectId ? dto.projectId : null,
            documentUrl: dto.documentUrl ? dto.documentUrl : null,
            version: dto.version ? dto.version : null,
            active: dto.active ? dto.active : false,
            name: dto.name ? dto.name : null,
            reason: dto.reason ? dto.reason : null,
            description: dto.description ? dto.description : null,
            rationale: dto.rationale ? dto.rationale : null,
            thumbnail: dto.thumbnail ? dto.thumbnail : null,
            prepared_by: dto.prepared_by ? dto.prepared_by : null,
            prepared_at: dto.prepared_at ? dto.prepared_at : null,
            revision_by: dto.revision_by ? dto.revision_by : revision_by,
            revision_description: dto.revision_description ? dto.revision_description : null,
            revision_at: dto.revision_at ? dto.revision_at : null,
            pre_approved_by: dto.pre_approved_by ? dto.pre_approved_by : [],
            approved_by: dto.approved_by ? dto.approved_by : [],
            read_by: dto.read_by ? dto.read_by : [],
            eSources: dto.eSources ? dto.eSources : [],
            eSourceData: dto.eSourceData ? dto.eSourceData : [],
            requested_at: dto.requested_at ? dto.requested_at : null,
            requested_by: dto.requested_by ? dto.requested_by : requested_by,
            requested_type: dto.requested_type ? dto.requested_type : null,
            effective_at: dto.effective_at ? dto.effective_at : null,
            created_at: dto.created_at ? dto.created_at : datetime,
            updated_at: dto.updated_at ? dto.updated_at : datetime,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

}

export interface CsvDocumentDto extends BaseDto {
    id: string,
    sort: number,
    object: string,
    objectId: string,
    orgId: string,
    projectId: string,
    documentUrl?: string,
    version?: number,
    active?: boolean,
    name?: string,
    reason?: string,
    description?: string,
    rationale?: string,
    thumbnail?: string,
    prepared_by: CsvSignatureDto,
    prepared_at: string,
    revision_by?: CsvSignatureDto,
    revision_description?: string,
    revision_at?: string,
    pre_approved_by?: CsvSignatureDto[],
    approved_by?: CsvSignatureDto[],
    read_by?: CsvSignatureDto[],
    eSources?: EsourceDto[],
    eSourceData?: EsourceDataDto[],
    requested_at?: string,
    requested_by?: CsvSignatureDto,
    requested_type?: string,
    effective_at?: string,
    created_at?: string,
    updated_at?: string,
    deleted_at?: string,    
}


