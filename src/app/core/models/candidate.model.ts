import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from './base-dto.model';
import { EsourceDto } from './esource.model';
import { Location } from './app.models';
import { SiteDto } from './site.model';
import { TrialIndicationDto } from './trial-indication.model';
import { TrialDto } from './trial.model';
import { UserDto } from './user.model';

export class CandidateModel {
    constructor(
        id: string,
        orgId: string,
        user: UserDto,
        firstName: string,
        middleName: string,
        lastName: string,
        dob: string,
        geneticInfo: string,
        minor: boolean,
        guardianName: string,
        realtionship: string,
        guardians: GuardianDto[],
        diagnosis: TrialIndicationDto,
        site: SiteDto,
        trial: TrialDto,
        address: string,
        language: string,
        referredBy: string,
        hipaaPolicy: boolean,
        privacyPolicy: boolean,
        contactPolicy: boolean,
        termsPolicy: boolean,
        esources: EsourceDto[],
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.user = user;
            this.firstName = firstName;
            this.middleName = middleName;
            this.lastName = lastName;
            this.dob = dob;
            this.geneticInfo = geneticInfo;
            this.minor = minor;
            this.guardianName = guardianName;
            this.relationship = realtionship;
            this.guardians = guardians;
            this.diagnosis = diagnosis;
            this.site = site;
            this.trial = trial;
            this.address = address;
            this.language = language;
            this.referredBy = referredBy;
            this.hipaaPolicy = hipaaPolicy;
            this.privacyPolicy = privacyPolicy;
            this.contactPolicy = contactPolicy;
            this.termsPolicy = termsPolicy;
            this.esources = esources;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
        }
    public id: string;
    public orgId: string;
    public user: UserDto;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public dob: string;
    public geneticInfo: string;
    public minor: boolean;
    public guardianName: string;
    public relationship: string;
    public guardians: GuardianDto[];
    public diagnosis: TrialIndicationDto;
    public site: SiteDto;
    public trial: TrialDto;
    public address: string;
    public language: string;
    public referredBy: string;
    public hipaaPolicy: boolean;
    public privacyPolicy: boolean;
    public contactPolicy: boolean;
    public termsPolicy: boolean;
    public esources: EsourceDto[];
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;
    
    public static toDto(dto: CandidateDto): CandidateDto {
        return {
            id: dto.id,
            orgId: dto.orgId,
            user: dto.user ? dto.user : null,
            firstName: dto.firstName ? dto.firstName : null,
            middleName: dto.middleName ? dto.middleName : null,
            lastName: dto.lastName ? dto.lastName : null,
            dob: dto.dob ? dto.dob : null,
            geneticInfo: dto.geneticInfo ? dto.geneticInfo : null,
            minor: dto.minor ? dto.minor : null,
            guardianName: dto.guardianName ? dto.guardianName : null,
            relationship: dto.relationship ? dto.relationship : null,
            guardians: dto.guardians ? dto.guardians : null,
            diagnosis: dto.diagnosis ? dto.diagnosis : null,
            site: dto.site ? dto.site : null,
            trial: dto.trial ? dto.trial : null,
            address: dto.address ? dto.address : null,
            language: dto.language ? dto.language : null,
            referredBy: dto.referredBy ? dto.referredBy : null,
            hipaaPolicy: dto.hipaaPolicy ? dto.hipaaPolicy : null,
            privacyPolicy: dto.privacyPolicy ? dto.privacyPolicy : null,
            contactPolicy: dto.contactPolicy ? dto.contactPolicy : null,
            termsPolicy: dto.termsPolicy ? dto.termsPolicy : null,
            esources: dto.esources ? dto.esources : null,
            created_at: dto.created_at ? dto.created_at : null,
            updated_at: dto.updated_at ? dto.updated_at : null,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
            };
    }

    public static emptyDto(): CandidateDto {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            user: null,
            firstName: '',
            middleName: '',
            lastName: '',
            dob: '',
            geneticInfo: '',
            minor: false,
            guardianName: '',
            relationship: '',
            guardians: [],
            diagnosis: null,
            site: null,
            trial: null,
            address: '',
            language: '',
            referredBy: '',
            hipaaPolicy: false,
            privacyPolicy: false,
            contactPolicy: false,
            termsPolicy: false,
            esources: [],
            created_at: date,
            updated_at: date,
            deleted_at: null,
        }
    }
}

export interface CandidateDto  extends BaseDto {
    id: string;
    orgId: string;
    user: UserDto;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    geneticInfo: string;
    minor: boolean;
    guardianName: string;
    relationship: string;
    guardians: GuardianDto[];
    diagnosis: TrialIndicationDto;
    site: SiteDto;
    trial: TrialDto;
    address: string;
    language: string;
    referredBy: string;
    hipaaPolicy: boolean;
    privacyPolicy: boolean;
    contactPolicy: boolean;
    termsPolicy: boolean;
    esources: EsourceDto[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface GuardianDto {
    firstName: string;
    lastName: string;
    relationship: string;
    email: string;
    mobileCountry?: string;
    mobileNo?: string;
    alternateNo?: string;
    address?: string;
    country?: string;
    location?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
