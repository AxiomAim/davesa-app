
import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class ErrorMessageModel {
    constructor(
        id: number,
        message: MessageDto[]
        ) {
        this.id = id;
        this.message = message;
    }
    public id: number;
    public name: string;
    public message: MessageDto[];

    public static toDto(dto: ErrorMessageDto): ErrorMessageDto {
        return {
            id: dto.id,
            name: dto.name ? dto.name : null,
            message: dto.message ? dto.message : null,
        };
    }

    public static emptyDto(): ErrorMessageDto {
        const datetime = new Date().toISOString();
        return {
            id: 1,
            name: '',
            message: [],
        };
    }
}

export interface ErrorMessageDto {
    id: number;
    name: string;
    message: MessageDto[];
}

export interface MessageDto {
    type: string;
    message: string;
}