import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from './base-dto.model';
import { AccessRole } from './app.models';
import { RoleDto } from './role.model';
import { StorageAssetDto } from './storage-asset.model';

const avatar = {
    id: uuidv4().toString(),
    sort: 1,
    name: 'logo',
    description: '',
    imageUrl: 'assets/images/profile-placeholder.png'
}


export class UserModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        firstTime: boolean,
        staffId: number, 
        staff: boolean, 
        commitee: string, 
        projectId: string,
        activeUser: boolean,
        role: RoleDto[],
        accessRoles: AccessRole[],
        developer: boolean,        
        superAdmin: boolean,
        systemAdmin: boolean,
        csvAudit: boolean,
        csvUser: boolean,
        csvTester: boolean,
        csvAdmin: boolean,
        davesaUser: boolean,
        davesaAdmin: boolean,
        siteAdmin: boolean,
        covidNotify: boolean,
        covidNurse: boolean,
        email: string,
        personalEmail: string,
        fullName: string,
        userName: string,
        signatureName: string,
        signatureRole: string,
        signaturePassword: string,
        title: string,
        firstName: string,
        lastName: string,
        description: string,
        suffixName: string,
        address: string,
        emailSignature: string,
        imageUrl: string,
        avatar: StorageAssetDto,
        linkedIn: string,
        mobileCountry?: string,
        mobileNo?: string,
        officeNo?: string,
        token?: string,
        web_token?: string,
        tokenDate?: string,
        fcm?: boolean,
        status?: string,
        platform?: string,
        model?: string,
        uuid?: string,
        country?: string,
        selected?: boolean,
        login_at?: string[],
        login_info?: any[],
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.firstTime = firstTime;
            this.staffId = staffId;
            this.staff = staff;
            this.commitee = commitee;
            this.projectId = projectId;
            this.activeUser = activeUser;
            this.role = role;
            this.accessRoles = accessRoles;
            this.developer = developer;
            this.superAdmin = superAdmin;
            this.csvAudit = csvAudit;
            this.csvUser = csvUser;
            this.csvTester = csvTester;
            this.csvAdmin = csvAdmin;
            this.davesaUser = davesaUser;
            this.davesaAdmin = davesaAdmin;
            this.systemAdmin = systemAdmin;
            this.siteAdmin = siteAdmin;
            this.covidNotify = covidNotify;
            this.covidNurse = covidNurse;
            this.fullName = fullName;
            this.userName = userName;
            this.signatureName = signatureName;
            this.signatureRole = signatureRole;
            this.signaturePassword = signaturePassword;
            this.title = title;
            this.firstName = firstName;
            this.lastName = lastName;
            this.description = description;
            this.suffixName = suffixName;
            this.address = address;
            this.emailSignature = emailSignature;
            this.email = email;
            this.personalEmail = personalEmail;
            this.imageUrl = imageUrl;
            this.avatar = avatar;
            this.linkedIn = linkedIn;
            this.mobileCountry = mobileCountry;
            this.mobileNo = mobileNo;
            this.officeNo = officeNo;
            this.token = token;
            this.web_token = web_token;
            this.tokenDate = tokenDate;
            this.fcm = fcm;
            this.status = status;
            this.platform = platform;
            this.model = model;
            this.uuid = uuid;
            this.country = country;
            this.selected = selected;
            this.login_at = login_at;
            this.login_info = login_info;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
    }
    public id: string;
    public orgId: string;
    public firstTime: boolean;
    public staffId: number;
    public staff: boolean;
    public commitee: string;
    public projectId: string;
    public activeUser: boolean;
    public role: RoleDto[];
    public accessRoles: AccessRole[];
    public developer: boolean;
    public superAdmin: boolean;
    public systemAdmin: boolean;
    public csvAudit: boolean;
    public csvUser: boolean;
    public csvTester: boolean;
    public csvAdmin: boolean;
    public davesaUser: boolean;
    public davesaAdmin: boolean;
    public siteAdmin: boolean;
    public covidNotify: boolean;
    public covidNurse: boolean;
    public fullName: string;
    public userName: string;
    public signatureName: string;
    public signatureRole: string;
    public signaturePassword: string;
    public title: string;
    public firstName: string;
    public lastName: string;
    public description: string;
    public suffixName: string;
    public address: string;
    public emailSignature: string;
    public email: string;
    public personalEmail: string;
    public imageUrl: string;
    public avatar: StorageAssetDto;
    public linkedIn: string;
    public thumb?: string;
    public mobileCountry?: string;
    public mobileNo?: string;
    public officeNo?: string;
    public token?: string;
    public web_token?: string;
    public tokenDate?: string;
    public fcm?: boolean;
    public status?: string;
    public platform?: string;
    public model?: string;
    public uuid?: string;
    public country?: string;
    public selected?: boolean;
    public login_at?: string[];
    public login_info?: any[];
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    public static toDto(dto: UserDto): UserDto {
        return {
            id: dto.id,
            orgId: dto.orgId ? dto.orgId : null,
            firstTime: dto.firstTime ? dto.firstTime : true,
            staffId: dto.staffId ? dto.staffId : null,
            staff: dto.staff ? dto.staff : false,
            commitee: dto.commitee ? dto.commitee : null,
            projectId: dto.projectId ? dto.projectId : null,
            activeUser: dto.activeUser ? dto.activeUser : false,
            role: dto.role ? dto.role : null,
            accessRoles: dto.accessRoles ? dto.accessRoles : [],
            developer: dto.developer ? dto.developer : false,
            superAdmin: dto.superAdmin ? dto.superAdmin : false,
            csvAudit: dto.csvAudit ? dto.csvAudit : false,
            csvUser: dto.csvUser ? dto.csvUser : false,
            csvTester: dto.csvTester ? dto.csvTester : false,
            csvAdmin: dto.csvAdmin ? dto.csvAdmin : false,
            davesaUser: dto.davesaUser ? dto.davesaUser : false,
            davesaAdmin: dto.davesaAdmin ? dto.davesaAdmin : false,
            systemAdmin: dto.systemAdmin ? dto.systemAdmin : false,
            siteAdmin: dto.siteAdmin ? dto.siteAdmin : false,
            covidNotify: dto.covidNotify ? dto.covidNotify : false,
            covidNurse: dto.covidNurse ? dto.covidNurse : false,
            fullName: dto.fullName ? dto.fullName : null,
            userName: dto.userName ? dto.userName : null,
            signatureName: dto.signatureName ? dto.signatureName : null,
            signatureRole: dto.signatureRole ? dto.signatureRole : null,
            signaturePassword: dto.signaturePassword ? dto.signaturePassword : null,
            title: dto.title ? dto.title : null,
            firstName: dto.firstName ? dto.firstName : null,            
            lastName: dto.lastName ? dto.lastName : null,
            description: dto.description ? dto.description : null,
            suffixName: dto.suffixName ? dto.suffixName : null,
            address: dto.address ? dto.address : null,
            emailSignature: dto.emailSignature ? dto.emailSignature : null,
            email: dto.email ? dto.email : null,
            personalEmail: dto.personalEmail ? dto.personalEmail : null,
            imageUrl: dto.imageUrl ? dto.imageUrl : 'assets/images/profile-placeholder.png',
            avatar: dto.avatar ? dto.avatar : null,
            linkedIn: dto.linkedIn ? dto.linkedIn : null,
            mobileCountry: dto.mobileCountry ? dto.mobileCountry : null,
            mobileNo: dto.mobileNo ? dto.mobileNo : null,
            officeNo: dto.officeNo ? dto.officeNo : null,
            token: dto.token ? dto.token : null,
            web_token: dto.web_token ? dto.web_token : null,
            tokenDate: dto.tokenDate ? dto.tokenDate : null,
            fcm: dto.fcm ? dto.fcm : false,
            status: dto.status ? dto.status : null,
            platform: dto.platform ? dto.platform : null,
            model: dto.model ? dto.model : null,
            uuid: dto.uuid ? dto.uuid : null,
            country: dto.country ? dto.country : null,
            selected: dto.selected ? dto.selected : false,
            login_at: dto.login_at ? dto.login_at : null,
            login_info: dto.login_info ? dto.login_info : null,
            created_at: dto.created_at ? dto.created_at : null,
            updated_at: dto.updated_at ? dto.updated_at : null,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto(): UserDto {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            firstTime: true,
            staffId: null, 
            staff: false, 
            commitee: null, 
            projectId: 'b71e65d8-faa0-619a-d29d-5a8b65feb0bb',
            activeUser: false,
            role: [],
            accessRoles: [],
            developer: false,
            superAdmin: false,
            systemAdmin: false,
            csvAudit: false,
            csvUser: false,
            csvTester: false,
            csvAdmin: false,
            davesaUser: false,
            davesaAdmin: false,
            siteAdmin: false,
            covidNotify: false,
            covidNurse: false,
            email: null,
            personalEmail: null,
            fullName: '',
            userName: '',
            signatureName: null,
            signatureRole: null,
            signaturePassword: null,
            title: null,
            firstName: '',
            lastName: '',
            description: '',
            suffixName: null,
            address: null,
            emailSignature: '',
            imageUrl: 'assets/images/profile-placeholder.png',
            avatar: null,
            linkedIn: 'https://www.linkedin.com/company/rarediseaseresearch/',
            mobileCountry: "+1",
            mobileNo: null,
            officeNo: null,
            token: null,
            web_token: null,
            tokenDate: null,
            fcm: false,
            status: null,
            platform: null,
            model: null,
            uuid: null,
            country: null,
            selected: false,
            login_at: [],
            login_info: [],
            created_at: date,
            updated_at: date,
            deleted_at: null,
        }
    }
}

export interface UserDto  extends BaseDto {
    id: string;
    orgId: string;
    firstTime: boolean;
    staffId: number;
    staff: boolean;
    commitee: string;
    projectId: string;
    activeUser: boolean;
    role: RoleDto[];
    accessRoles: AccessRole[];
    developer: boolean;
    superAdmin: boolean;
    systemAdmin: boolean;
    csvAudit: boolean;
    csvUser: boolean;
    csvTester: boolean;
    csvAdmin: boolean;
    davesaUser: boolean;
    davesaAdmin: boolean;
    siteAdmin: boolean;
    covidNotify: boolean;
    covidNurse: boolean;
    email: string;
    personalEmail: string;
    fullName: string;
    userName: string;
    signatureName: string;
    signatureRole: string;
    signaturePassword: string;
    title: string;
    firstName: string;
    lastName: string;
    description: string;
    suffixName: string;
    address: string;
    emailSignature: string;
    imageUrl: string;
    avatar: StorageAssetDto;
    linkedIn: string;
    mobileCountry?: string;
    mobileNo?: string;
    officeNo?: string;
    token?: string;
    web_token?: string;
    tokenDate?: string;
    fcm?: boolean;
    status?: string;
    platform?: string;
    model?: string;
    uuid?: string;
    country?: string;
    selected?: boolean;
    login_at?: string[];
    login_info?: any[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
