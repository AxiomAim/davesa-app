
import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from '../base-dto.model';

export class ApiProductModel {

    constructor(
        id: string,
        name: string,
        price: number,
        stockQuantity: number,
        internalCode: string,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.internalCode = internalCode;
    }
    public id: string;
    public name: string;
    public price: number;
    public stockQuantity: number;
    public internalCode: string;

    public static toDto(dto: ApiProductDto): ApiProductDto {
        return {
            id: dto.id,
            name: dto.name ? dto.name : null,
            price: dto.price ? dto.price : null,
            stockQuantity: dto.stockQuantity ? dto.stockQuantity : null,
            internalCode: dto.internalCode ? dto.internalCode : null,
        };
    }

    public static emptyDto(): ApiProductDto {
        return {
            id: uuidv4().toString(),
            name: null,
            price: null,
            stockQuantity: null,
            internalCode: null,
        };
    }
}

export interface ApiProductDto extends BaseDto {
    id: string,
    name: string,
    price: number,
    stockQuantity: number,
    internalCode: string,
}

