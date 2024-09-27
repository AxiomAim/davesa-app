import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { CsvDocumentDto } from './csv-document.model';
import { StoragePDFAssetDto } from './storage-asset-pdf.model';
import { CsvSignatureDto, CsvSignatureModel } from './csv-signature.model';
import { EsourceDto } from './esource.model';
import { EsourceDataDto } from './esource-data.model';
import { CsvTestDto } from './csv-test.model';

export class CsvMatrixModel {

    constructor(
        id: string,
        orgId: string,
        projectId: string,
        sort: number,
        name: string,
        description: string,
        prepared_by: CsvSignatureDto,
        prepared_at: string,
        csvDocuments: CsvDocumentDto[],
        pdfs: StoragePDFAssetDto[],
        eSources?: EsourceDto[],
        eSourceData?: EsourceDataDto[],
        csvTests?: CsvTestDto[],
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,    
    
    ) {
        this.id = id;
        this.orgId = orgId;
        this.projectId = projectId;
        this.sort = sort;
        this.name = name;
        this.description = description;
        this.prepared_by = prepared_by;
        this.prepared_at = prepared_at;
        this.csvDocuments = csvDocuments;
        this.pdfs = pdfs;
        this.eSources = eSources;
        this.eSourceData = eSourceData;
        this.csvTest = csvTests;
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
    public prepared_by: CsvSignatureDto;
    public prepared_at: string;
    public csvDocuments: CsvDocumentDto[];
    public pdfs: StoragePDFAssetDto[];
    public eSources?: EsourceDto[];
    public eSourceData?: EsourceDataDto[];
    public csvTest?: CsvTestDto[];
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static emptyDto(): CsvMatrixDto {
        let datetime: any = new Date().toISOString();
        let newprepared_by: CsvSignatureDto = CsvSignatureModel.emptyDto();
        return {
            id: uuidv4().toString(),
            orgId: null,
            projectId: null,
            sort: 1,
            name: null,
            description: null,
            prepared_by: newprepared_by,
            prepared_at: datetime,
            csvDocuments: [],
            pdfs: [],
            eSources: [],
            eSourceData: [],
            csvTests: [],
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }


    public static toDto(dto: CsvMatrixDto): CsvMatrixDto {
        let date: any = new Date().toISOString();

        return {
            id: dto.id,
            orgId: dto.orgId ? dto.orgId : null,
            projectId: dto.projectId ? dto.projectId : null,
            sort: dto.sort ? dto.sort : 1,
            name: dto.name ? dto.name : null,
            description: dto.description ? dto.description : null,
            prepared_by: dto.prepared_by ? dto.prepared_by : null,
            prepared_at: dto.prepared_at ? dto.prepared_at : date,
            csvDocuments: dto.csvDocuments ? dto.csvDocuments : [],
            pdfs: dto.pdfs ? dto.pdfs : [],
            eSources: dto.eSources ? dto.eSources : [],
            eSourceData: dto.eSourceData ? dto.eSourceData : [],
            csvTests: dto.csvTests ? dto.csvTests : [],
            created_at: dto.created_at ? dto.created_at : date,
            updated_at: dto.updated_at ? dto.updated_at : date,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

}

export interface CsvMatrixDto extends BaseDto {
    id: string,
    orgId: string,
    projectId: string,
    sort: number,
    name: string,
    description: string,
    prepared_by: CsvSignatureDto,
    prepared_at: string,
    csvDocuments: CsvDocumentDto[],
    pdfs: StoragePDFAssetDto[],
    eSources?: EsourceDto[],
    eSourceData?: EsourceDataDto[],
    csvTests?: CsvTestDto[],
    created_at: string,
    updated_at: string,
    deleted_at: string,

}


