import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { v4 as uuidv4 } from 'uuid';
import { StorageAssetDto } from './storage-asset.model';
import { UserDto } from './user.model';
import { RoleDto } from './role.model';


const defaultLogo = {
    id: uuidv4().toString(),
    orgId: null,
    sort: 1,
    name: 'logo',
    description: '',
    imageUrl: 'assets/logo-davesa/horizontal_color.png'
}

const defaultLogoWhite = {
    id: uuidv4().toString(),
    orgId: null,
    sort: 1,
    name: 'logo',
    description: '',
    imageUrl: 'assets/logo-davesa/horizontal_white.png'
}

const defaultLogoIcon = {
    id: uuidv4().toString(),
    orgId: null,
    sort: 1,
    name: 'logo',
    description: '',
    imageUrl: 'assets/logo-davesa/icon_color.png'
}

const defaultLogoBlack = {
    id: uuidv4().toString(),
    orgId: null,
    sort: 1,
    name: 'logo',
    description: '',
    imageUrl: 'assets/logo-davesa/horizontal_black.png'
}



export class OrgModel extends BaseDatabaseModel {

    constructor(
        id: string,
        orgId: string,
        primary: boolean,
        domain: string,
        name: string,
        url: string,
        email: string,
        address: string,
        phone: string,
        officeHours: string,
        logo: StorageAssetDto,
        logoIcon: StorageAssetDto,
        logoWhite: StorageAssetDto,
        logoBlack: StorageAssetDto,
        socialFacebook: string,
        socialX: string,
        socialLinkedIn: string,
        socialGoogle: string,
        socialInstagram: string,
        active: boolean,
        theme: string,
        toolbar: number,
        stickyMenuToolbar: boolean,
        header: string,
        rtl: boolean,
        searchPanelVariant: number,
        searchOnBtnClick: boolean,
        currency: string,
        adminSidenavIsOpened: boolean,
        adminSidenavIsPinned: boolean,
        adminSidenavUserBlock: boolean,
        mainToolbarFixed: boolean,
        contentOffsetToTop: boolean,
        headerBgImage: boolean,
        headerBgVideo: boolean,
        partnerBar: boolean,
        privacyPolicy?: string,
        hipaaPolicy?: string,
        termsPolicy?: string,
        contactPolicy?: string,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        isPrimaryDto?: boolean,
        userEmails?: UserEmail[],
        users?: UserDto[],
        nodemailer?: Nodemailer,

    ) {
        super();
        this.id = id;
        this.orgId = orgId;
        this.primary = primary;
        this.domain = domain;
        this.name = name;
        this.url = url;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.officeHours = officeHours;
        this.logo = logo;
        this.logoIcon = logoIcon;
        this.logoWhite = logoWhite;
        this.logoBlack = logoBlack;
        this.socialFacebook = socialFacebook;
        this.socialX = socialX;
        this.socialLinkedIn = socialLinkedIn;
        this.socialGoogle = socialGoogle;
        this.socialInstagram = socialInstagram;
        this.active = active;
        this.email = email;
        this.theme = theme;
        this.toolbar = toolbar;
        this.stickyMenuToolbar = stickyMenuToolbar;
        this.header = header;
        this.rtl = rtl;
        this.searchPanelVariant = searchPanelVariant;
        this.searchOnBtnClick = searchOnBtnClick;
        this.currency = currency;
        this.adminSidenavIsOpened = adminSidenavIsOpened;
        this.adminSidenavIsPinned = adminSidenavIsPinned;
        this.adminSidenavUserBlock = adminSidenavUserBlock;
        this.mainToolbarFixed = mainToolbarFixed;
        this.contentOffsetToTop = contentOffsetToTop;
        this.headerBgImage = headerBgImage;
        this.headerBgVideo = headerBgVideo;
        this.partnerBar = partnerBar;
        this.privacyPolicy = privacyPolicy;
        this.hipaaPolicy = hipaaPolicy;
        this.termsPolicy = termsPolicy;
        this.contactPolicy = contactPolicy;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
        this.isPrimaryDto = isPrimaryDto;
        this.userEmails = userEmails;
        this.users = users;
        this.nodemailer = nodemailer;

    }
    public id: string;
    public orgId: string;
    public primary: boolean;
    public domain: string;
    public name: string;
    public url: string;
    public email: string;
    public address: string;
    public phone: string;
    public officeHours: string;
    public logo: StorageAssetDto;
    public logoIcon: StorageAssetDto;
    public logoWhite: StorageAssetDto;
    public logoBlack: StorageAssetDto;
    public socialFacebook: string;
    public socialX: string;
    public socialLinkedIn: string;
    public socialGoogle: string;
    public socialInstagram: string;
    public active: boolean;
    public theme: string;
    public toolbar: number;
    public stickyMenuToolbar: boolean;
    public header: string;
    public rtl: boolean;
    public searchPanelVariant: number;
    public searchOnBtnClick: boolean;
    public currency: string;
    public adminSidenavIsOpened: boolean;
    public adminSidenavIsPinned: boolean;
    public adminSidenavUserBlock: boolean;
    public mainToolbarFixed: boolean;
    public contentOffsetToTop: boolean;
    public headerBgImage: boolean;
    public headerBgVideo: boolean;
    public partnerBar: boolean;
    public privacyPolicy?: string;
    public hipaaPolicy?: string;
    public termsPolicy?: string;
    public contactPolicy?: string;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;
    public isPrimaryDto: boolean;
    public userEmails?: UserEmail[];
    public users?: UserDto[];
    public nodemailer?: Nodemailer;

    // public static defaultLogo(): StorageAssetDto {
    //     const myLogo = {
    //         id: uuidv4().toString(),
    //         sort: 1,
    //         name: 'logo',
    //         description: '',
    //         imageUrl: 'assets/images/image-placeholder.png'
    //     }

    //     return myLogo;
    // }

    public static toDto(dto: OrgDto): OrgDto {
        const datetime = new Date().toISOString();
        return {
            id: dto.id,
            orgId: dto.orgId ? dto.orgId : null,
            primary: dto.primary ? dto.primary : false,
            domain: dto.domain,
            name: dto.name ? dto.name : null,
            url: dto.url ? dto.url : null,
            email: dto.email ? dto.email : null,
            address: dto.address ? dto.address : null,
            phone: dto.phone ? dto.phone : null,
            officeHours: dto.officeHours ? dto.officeHours : null,
            logo: dto.logo ? dto.logo : null,
            logoIcon: dto.logoIcon ? dto.logoIcon : null,
            logoWhite: dto.logoWhite ? dto.logoWhite : null,
            logoBlack: dto.logoBlack ? dto.logoBlack : null,
            socialFacebook: dto.socialFacebook ? dto.socialFacebook : null,
            socialX: dto.socialX ? dto.socialX : null,
            socialLinkedIn: dto.socialLinkedIn ? dto.socialLinkedIn : null,
            socialGoogle: dto.socialGoogle ? dto.socialGoogle : null,
            socialInstagram: dto.socialInstagram ? dto.socialInstagram : null,
            active: dto.active ? dto.active : true,
            theme: dto.theme ? dto.theme : 'davesa',
            toolbar: dto.toolbar ? dto.toolbar : 1,
            stickyMenuToolbar: dto.stickyMenuToolbar ? dto.stickyMenuToolbar : false,
            header: dto.header ? dto.header : 'image',
            rtl: dto.rtl ? dto.rtl : false,
            searchPanelVariant: dto.searchPanelVariant ? dto.searchPanelVariant : 1,
            searchOnBtnClick: dto.searchOnBtnClick ? dto.searchOnBtnClick : false,
            currency: dto.currency ? dto.currency : 'USD',
            adminSidenavIsOpened: dto.adminSidenavIsOpened ? dto.adminSidenavIsOpened : true,
            adminSidenavIsPinned: dto.adminSidenavIsPinned ? dto.adminSidenavIsPinned : true,
            adminSidenavUserBlock: dto.adminSidenavUserBlock ? dto.adminSidenavUserBlock : true,
            mainToolbarFixed: dto.mainToolbarFixed ? dto.mainToolbarFixed : false,
            contentOffsetToTop: dto.contentOffsetToTop ? dto.contentOffsetToTop : false,
            headerBgImage: dto.headerBgImage ? dto.headerBgImage : false,
            headerBgVideo: dto.headerBgVideo ? dto.headerBgVideo : false,
            partnerBar: dto.partnerBar ? dto.partnerBar : false,
            privacyPolicy: dto.privacyPolicy ? dto.privacyPolicy : null,
            hipaaPolicy: dto.hipaaPolicy ? dto.hipaaPolicy : null,
            termsPolicy: dto.termsPolicy ? dto.termsPolicy : null,
            contactPolicy: dto.contactPolicy ? dto.contactPolicy : null,
            created_at: dto.created_at ? dto.created_at : datetime,
            updated_at: dto.updated_at ? dto.updated_at : datetime,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
            isPrimaryDto: dto.isPrimaryDto ? dto.isPrimaryDto : false,
            userEmails: dto.userEmails ? dto.userEmails : [],
            users: dto.users ? dto.users : [],
            nodemailer: dto.nodemailer ? dto.nodemailer : null
        };
    }

    public static emptyDto(): OrgDto {
        const datetime = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: null,
            primary: false,
            domain: null,
            name: null,
            url: null,
            email: null,
            address: null,
            phone: null,
            officeHours: null,
            logo: defaultLogo,
            logoIcon: defaultLogoIcon,
            logoWhite: defaultLogoWhite,
            logoBlack: defaultLogoBlack,
            socialFacebook: null,
            socialX: null,
            socialLinkedIn: null,
            socialGoogle: null,
            socialInstagram: null,
            active: true,
            theme: 'davesa',
            toolbar: 1,
            stickyMenuToolbar: true,
            header: 'image',
            rtl: false,
            searchPanelVariant: 1,
            searchOnBtnClick: false,
            currency: 'USD',
            adminSidenavIsOpened: true,
            adminSidenavIsPinned: true,
            adminSidenavUserBlock: true,
            mainToolbarFixed: true,
            contentOffsetToTop: true,
            headerBgImage: true,
            headerBgVideo: true,
            partnerBar: false,
            privacyPolicy: null,
            hipaaPolicy: null,
            termsPolicy: null,
            contactPolicy: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
            isPrimaryDto: false,
            userEmails: [],
            users: [],
            nodemailer: null,

        }
    }

    public static primaryDefaultDto(): OrgDto {
        const datetime = new Date().toISOString();
        return {
            id: 'csv.davesa.com',
            orgId: null,
            primary: true,
            domain: 'csv.davesa.com',
            name: 'Davesa Health',
            url: 'http://davesa.com',
            email: 'info@davesa.com',
            address: '1730 NE Expy NE Atlanta, GA 30329',
            phone: '(470) 665-3051',
            officeHours: 'Mon - Fri / 8:00AM - 4:30PM ET',
            logo: defaultLogo,
            logoIcon: defaultLogoIcon,
            logoWhite: defaultLogoWhite,
            logoBlack: defaultLogoBlack,
            socialFacebook: 'https://www.facebook.com/RareDiseaseResearch/',
            socialX: 'https://twitter.com/RDR_Atlanta',
            socialLinkedIn: 'https://www.linkedin.com/company/rarediseaseresearch',
            socialGoogle: null,
            socialInstagram: null,
            active: true,
            theme: 'davesa',
            toolbar: 1,
            stickyMenuToolbar: true,
            header: 'image',
            rtl: false,
            searchPanelVariant: 1,
            searchOnBtnClick: false,
            currency: 'USD',
            adminSidenavIsOpened: true,
            adminSidenavIsPinned: true,
            adminSidenavUserBlock: true,
            mainToolbarFixed: true,
            contentOffsetToTop: true,
            headerBgImage: true,
            headerBgVideo: true,
            partnerBar: false,
            privacyPolicy: null,
            hipaaPolicy: null,
            termsPolicy: null,
            contactPolicy: null,
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
            isPrimaryDto: true,
            userEmails: [],
            users: [],
            nodemailer: null,
        }
    }

}

export interface OrgDto extends BaseDto {
    id: string,
    orgId: string,
    primary: boolean,
    domain: string,
    name: string,
    url: string,
    email: string,
    address: string,
    phone: string,
    officeHours: string,
    logo: StorageAssetDto,
    logoIcon: StorageAssetDto,
    logoWhite: StorageAssetDto,
    logoBlack: StorageAssetDto,
    socialFacebook: string,
    socialX: string,
    socialLinkedIn: string,
    socialGoogle: string,
    socialInstagram: string,
    active: boolean,
    theme: string,
    toolbar: number,
    stickyMenuToolbar: boolean,
    header: string,
    rtl: boolean,
    searchPanelVariant: number,
    searchOnBtnClick: boolean,
    currency: string,
    adminSidenavIsOpened: boolean,
    adminSidenavIsPinned: boolean,
    adminSidenavUserBlock: boolean,
    mainToolbarFixed: boolean,
    contentOffsetToTop: boolean,
    headerBgImage: boolean,
    headerBgVideo: boolean,
    partnerBar: boolean,
    privacyPolicy?: string,
    hipaaPolicy?: string,
    termsPolicy?: string,
    contactPolicy?: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    isPrimaryDto: boolean,
    userEmails?: UserEmail[],
    users?: UserDto[],
    nodemailer?: Nodemailer,
}


// export interface SocialLinks {
//     facebookUrl?: string,
//     twitterUrl?: string,
//     linkedInUrl?: string,
//     youtubeUrl?: string,
// }


// export interface LoadMore {
//     start: boolean,
//     step: number,
//     load: boolean,
//     page: number,
//     complete: boolean,
//     result: number
// }

export interface UserEmail {
    email: string,
    user?: UserDto,
    role?: RoleDto
}

export interface Nodemailer {
    host: string,
    port: number,
    secure: boolean // Use `true` for port 465, `false` for all other ports
    auth: {
        user: string,
        pass: string
    }
}
