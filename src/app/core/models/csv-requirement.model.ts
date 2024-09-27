import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { CsvSignatureDto, CsvSignatureModel } from './csv-signature.model';
import { CsvDocumentDto } from './csv-document.model';
import { StorageDto } from './storage.model';
import { EsourceDto } from './esource.model';
import { CsvTestDto } from './csv-test.model';

export class CsvRequirementModel {

    constructor(
        id: string,
        orgId: string,
        projectId: string,
        hierarchId: string,
        sort: number,
        parentId: string,
        isParent: string,
        hasParent: string,
        active: boolean,
        children: CsvRequirementDto[],
        name: string,
        description: string,
        isSystemFunction: boolean,
        isUserRequirement: boolean,
        isFunctionalRequirement: boolean,
        isDocument: boolean,
        isTitle: boolean,
        riskLevel: string,
        videoUrl: string,
        images: StorageDto[],
        approved?: boolean,
        prepared_by?: CsvSignatureDto,
        prepared_at?: string,
        revised_by?: CsvSignatureDto,
        revised_description?: string,
        revision_at?: string,
        approved_by?: CsvSignatureDto[],
        csvDocuments?: CsvDocumentDto[],
        eSources?: EsourceDto[],
        csvTests?: CsvTestDto[],
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
    ) {
        this.id = id;
        this.orgId = orgId;
        this.projectId = projectId;
        this.hierarchId = hierarchId;
        this.sort = sort;
        this.parentId = parentId;
        this.isParent = isParent;
        this.hasParent = hasParent;
        this.active = active;
        this.children = children;
        this.name = name;
        this.description = description;
        this.isSystemFunction = isSystemFunction;
        this.isUserRequirement = isUserRequirement;
        this.isFunctionalRequirement = isFunctionalRequirement;
        this.isDocument = isDocument;
        this.isTitle = isTitle;
        this.riskLevel = riskLevel;
        this.videoUrl = videoUrl;
        this.images = images;
        this.approved = approved;
        this.prepared_by = prepared_by;
        this.prepared_at = prepared_at;
        this.revised_by = revised_by;
        this.revised_description = revised_description;
        this.revision_at = revision_at;
        this.approved_by = approved_by;
        this.csvDocuments = csvDocuments;
        this.eSources = eSources;
        this.csvTests = csvTests;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public orgId: string;
    public projectId: string;
    public hierarchId: string;
    public sort: number;
    public parentId: string;
    public isParent: string;
    public hasParent: string;
    public active: boolean;
    public children: CsvRequirementDto[];
    public name: string;
    public description: string;
    public isSystemFunction: boolean;
    public isUserRequirement: boolean;
    public isFunctionalRequirement: boolean;
    public isDocument: boolean;
    public isTitle: boolean;
    public riskLevel: string;
    public videoUrl: string;
    public images: StorageDto[];
    public approved: boolean;
    public prepared_by: CsvSignatureDto;
    public prepared_at: string;
    public revised_by: CsvSignatureDto;
    public revised_description: string;
    public revision_at: string;
    public approved_by: CsvSignatureDto[];
    public csvDocuments: CsvDocumentDto[];
    public eSources: EsourceDto[];
    public csvTests: CsvTestDto[];
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static emptyDto(): CsvRequirementDto {
        let date: any = new Date().toISOString();
        let prepared_by: CsvSignatureDto = CsvSignatureModel.emptyDto();

        return {
            id: uuidv4().toString(),
            orgId: null,
            projectId: null,
            hierarchId: null,
            sort: 1,
            parentId: null,
            isParent: null,
            hasParent: null,
            active: true,
            children: [],
            name: null,
            description: ' ',
            isSystemFunction: false,
            isUserRequirement: false,
            isFunctionalRequirement: false,
            isDocument: false,
            isTitle: false,
            riskLevel: 'Low',
            videoUrl: null,
            images: [],
            approved: false,
            prepared_by: prepared_by,
            prepared_at: date,
            revised_by: null,
            revised_description: null,
            revision_at: date,
            approved_by: [],
            csvDocuments: [],
            eSources: [],
            csvTests: [],
            created_at: date,
            updated_at: date,
            deleted_at: null,
        }
    }

    public static toDto(dto: CsvRequirementDto): CsvRequirementDto {
        let date: any = new Date().toISOString();
        let prepared_by: CsvSignatureDto = CsvSignatureModel.emptyDto();
        return {
            id: dto.id,
            orgId: dto.orgId ? dto.orgId : null,
            projectId: dto.projectId ? dto.projectId : null,
            hierarchId: dto.hierarchId ? dto.hierarchId : null,
            sort: dto.sort ? dto.sort : 1,
            parentId: dto.parentId ? dto.parentId : null,
            isParent: dto.isParent ? dto.isParent : null,
            hasParent: dto.hasParent ? dto.hasParent : null,
            active: dto.active ? dto.active : true,
            children: dto.children ? dto.children : [],
            name: dto.name ? dto.name : null,
            description: dto.description ? dto.description : null,
            isSystemFunction: dto.isSystemFunction ? dto.isSystemFunction : false,
            isUserRequirement: dto.isUserRequirement ? dto.isUserRequirement : false,
            isFunctionalRequirement: dto.isFunctionalRequirement ? dto.isFunctionalRequirement : false,
            isDocument: dto.isDocument ? dto.isDocument : false,
            isTitle: dto.isTitle ? dto.isTitle : false,
            riskLevel: dto.riskLevel ? dto.riskLevel : 'Low',
            videoUrl: dto.videoUrl ? dto.videoUrl : null,
            images: dto.images ? dto.images : [],
            approved: dto.approved ? dto.approved : false,
            prepared_by: dto.prepared_by ? dto.prepared_by : prepared_by,
            prepared_at: dto.prepared_at ? dto.prepared_at : date,
            revised_by: dto.revised_by ? dto.revised_by : null,
            revised_description: dto.revised_description ? dto.revised_description : null,
            revision_at: dto.revision_at ? dto.revision_at : date,
            approved_by: dto.approved_by ? dto.approved_by : [],
            csvDocuments: dto.csvDocuments ? dto.csvDocuments : [],
            eSources: dto.eSources ? dto.eSources : [],
            csvTests: dto.csvTests ? dto.csvTests : [],
            created_at: dto.created_at ? dto.created_at : date,
            updated_at: dto.updated_at ? dto.updated_at : date,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }
}

export interface CsvRequirementDto extends BaseDto {
    id: string;
    orgId: string;
    projectId: string;
    hierarchId: string;
    sort: number;
    parentId: string;
    isParent?: boolean;
    hasParent: boolean;
    active: boolean;
    children: CsvRequirementDto[];
    name: string;
    description: string;
    isSystemFunction: boolean;
    isUserRequirement: boolean;
    isFunctionalRequirement: boolean;
    isDocument: boolean;
    isTitle: boolean;
    riskLevel: string;
    videoUrl: string;
    images: StorageDto[];
    approved?: boolean;
    prepared_by: CsvSignatureDto;
    prepared_at: string;
    revised_by: CsvSignatureDto;
    revised_description: string;
    revision_at: string;
    approved_by?: CsvSignatureDto[];
    csvDocuments?: CsvDocumentDto[];
    eSources?: EsourceDto[];
    csvTests?: CsvTestDto[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}


