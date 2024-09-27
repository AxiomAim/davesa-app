
import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class TrialBoardModel {

    constructor(
        id: string,
        orgId: string,
        sort: number,
        name: string,
        description: string,
    ) {
        this.id = id;
        this.orgId = orgId;
        this.sort = sort;
        this.name = name;
        this.description = description;
    }
    public id: string;
    public orgId: string;
    public sort: number;
    public name: string;
    public description: string;

    public static toDto(dto: TrialIndicationDto): TrialIndicationDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            sort: dto.sort ? dto.sort : null,
            name: dto.name ? dto.name : null,
            description: dto.description ? dto.description : null,
        };
    }

    public static emptyDto(): TrialIndicationDto {
        return {
            id: uuidv4().toString(),
            orgId: null,
            sort: null,
            name: null,
            description: null,
        };
    }
}

export interface TrialIndicationDto extends BaseDto {
    id: string;
    orgId: string;
    sort: number;
    name: string;
    description: string;
}

