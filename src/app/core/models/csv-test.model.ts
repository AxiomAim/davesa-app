import { v4 as uuidv4 } from 'uuid';
import { CsvSignatureDto, CsvSignatureModel } from './csv-signature.model';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { EsourceDto } from './esource.model';
import { EsourceDataDto } from './esource-data.model';

export class CsvTestModel {

    constructor(
        id: string,    
        orgId: string,
        sort: number,
        steps: StepsDto[],
        eSource: EsourceDto,    
        eSourceData: EsourceDataDto,
        test_date: string,    
        action: string,
        expected_result: string,
        actual_result: string,
        passed: boolean,
        test_user: CsvSignatureDto,
        notes: string
        
    ) {
        this.id = id;
        this.orgId = orgId;
        this.sort = sort;
        this.steps = steps;
        this.esource = eSource;
        this.esourceData = eSourceData;
        this.test_date = test_date;
        this.action = action;
        this.expected_result = expected_result;
        this.actual_result = actual_result;
        this.passed = passed;
        this.test_user = test_user;
        this.notes = notes;
    }

    public id: string;
    public orgId: string;
    public sort: number;
    public steps: StepsDto[];
    public esource: EsourceDto;
    public esourceData: EsourceDataDto;
    public test_date: string;
    public action: string;
    public expected_result: string;
    public actual_result: string;
    public passed: boolean;
    public test_user: CsvSignatureDto;
    public notes: string;    

    public static emptyDto(): CsvTestDto {
        let date: any = new Date().toISOString();
        let test_user: CsvSignatureDto = CsvSignatureModel.emptyDto();
        return {
            id: uuidv4().toString(),
            orgId: null,
            sort: 1,
            steps: [],
            esource: null,
            esourceData: null,
            test_date: date,    
            action: null,
            expected_result: null,
            actual_result: null,
            passed: false,
            test_user: test_user,
            notes: null
        }
    }

    public static toDto(dto: CsvTestDto): CsvTestDto {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : null,
                sort: dto.sort ? dto.sort : 1,
                steps: dto.steps ? dto.steps : [],
                esource: dto.esource ? dto.esource : null,
                esourceData: dto.esourceData ? dto.esourceData : null,
                test_date: dto.test_date ? dto.test_date : new Date().toISOString(),
                action: dto.action ? dto.action : null,
                expected_result: dto.expected_result ? dto.expected_result : null,
                actual_result: dto.actual_result ? dto.actual_result : null,
                passed: dto.passed ? dto.passed : false,
                test_user: dto.test_user ? dto.test_user : CsvSignatureModel.emptyDto(),
                notes: dto.notes ? dto.notes : null
            };
        }
    
}

export interface CsvTestDto extends BaseDto {
    id: string,    
    orgId: string,
    sort: number,    
    steps: StepsDto[],
    esource: EsourceDto,
    esourceData: EsourceDataDto,
    test_date: string,    
    action: string,
    expected_result: string,
    actual_result: string,
    passed: boolean,
    test_user: CsvSignatureDto,
    notes: string
}

export interface StepsDto {
    sort: number,
    name: string,
    description: string,
    validation: string,
    selected: boolean,
    imageUrl: string
}



