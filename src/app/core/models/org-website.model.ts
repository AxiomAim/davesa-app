import { v4 as uuidv4 } from 'uuid';
import { BaseDatabaseModel, BaseDto } from "./base-dto.model";

export class OrgWebsiteModel extends BaseDatabaseModel {

    constructor(
        id: string,
        companyName: string,
        companyEmail: string,
        companyPhone: string,
        companyHours: string,
        companyAddress: string,
        carouselHeadActive: boolean,
        carouselHeadText: string,
        carouselFootActive: boolean,
        carouselFootText: string,
        carouselBenefitsActive: boolean,
        carouselAnimationActive: boolean,
        carouselAnimationLink: string,
        carouselMeterDBActive: boolean,
        applicationsActive: boolean,
        seriesActive: boolean,
        getInTouchActive: boolean,
        linkedInLink: string,
        youtubeLink: string,
        facebookLink: string,
        twitterLink: string,
        instagramLink: string,
        aboutContent: string,
        aboutTimeline: string,
        aboutPatent: string,
        serverEmailHost: string,
        serverEmailPort: number,
        serverEmailSecure: boolean,
        serverEmailAccount: string,
        serverEmailPassword: string,
        created_at: string,
        updated_at: string,
        deleted_at: string

    ) {
        super();
        this.id = id
        this.companyName = companyName
        this.companyEmail = companyEmail
        this.companyPhone = companyPhone
        this.companyHours = companyHours
        this.companyAddress = companyAddress
        this.carouselHeadActive = carouselHeadActive
        this.carouselHeadText = carouselHeadText
        this.carouselFootActive = carouselFootActive
        this.carouselFootText = carouselFootText
        this.carouselBenefitsActive = carouselBenefitsActive
        this.carouselAnimationActive = carouselAnimationActive
        this.carouselAnimationLink = carouselAnimationLink
        this.carouselMeterDBActive = carouselMeterDBActive
        this.applicationsActive = applicationsActive
        this.seriesActive = seriesActive
        this.getInTouchActive = getInTouchActive
        this.linkedInLink = linkedInLink
        this.youtubeLink = youtubeLink
        this.facebookLink = facebookLink
        this.twitterLink = twitterLink
        this.instagramLink = instagramLink
        this.aboutContent = aboutContent
        this.aboutTimeline = aboutTimeline
        this.aboutPatent = aboutPatent
        this.serverEmailHost = serverEmailHost
        this.serverEmailPort = serverEmailPort
        this.serverEmailSecure = serverEmailSecure
        this.serverEmailAccount = serverEmailAccount
        this.serverEmailPassword = serverEmailPassword
        this.created_at = created_at
        this.updated_at = updated_at
        this.deleted_at = deleted_at
    }

    public id: string;
    public companyName: string;
    public companyEmail: string;
    public companyPhone: string;
    public companyHours: string;
    public companyAddress: string;
    public carouselHeadActive: boolean;
    public carouselHeadText: string;
    public carouselFootActive: boolean;
    public carouselFootText: string;
    public carouselBenefitsActive: boolean;
    public carouselAnimationActive: boolean;
    public carouselAnimationLink: string;
    public carouselMeterDBActive: boolean;
    public applicationsActive: boolean;
    public seriesActive: boolean;
    public getInTouchActive: boolean;
    public linkedInLink: string;
    public youtubeLink: string;
    public facebookLink: string;
    public twitterLink: string;
    public instagramLink: string;
    public aboutContent: string;
    public aboutTimeline: string;
    public aboutPatent: string;
    public serverEmailHost: string;
    public serverEmailPort: number;
    public serverEmailSecure: boolean;
    public serverEmailAccount: string;
    public serverEmailPassword: string;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static toDto(dto: OrgWebsiteDto): OrgWebsiteDto {
        let date: any = new Date().toISOString();
        return {
            id: dto.id,
            companyName: dto.companyName ? dto.companyName : null,
            companyEmail: dto.companyEmail ? dto.companyEmail : null,
            companyPhone: dto.companyPhone ? dto.companyPhone : null,
            companyHours: dto.companyHours ? dto.companyHours : null,
            companyAddress: dto.companyAddress ? dto.companyAddress : null,
            carouselHeadActive: dto.carouselHeadActive ? dto.carouselHeadActive : null,
            carouselHeadText: dto.carouselHeadText ? dto.carouselHeadText : null,
            carouselFootActive: dto.carouselFootActive ? dto.carouselFootActive : null,
            carouselFootText: dto.carouselFootText ? dto.carouselFootText : null,
            carouselBenefitsActive: dto.carouselBenefitsActive ? dto.carouselBenefitsActive : null,
            carouselAnimationActive: dto.carouselAnimationActive ? dto.carouselAnimationActive : null,
            carouselAnimationLink: dto.carouselAnimationLink ? dto.carouselAnimationLink : null,
            carouselMeterDBActive: dto.carouselMeterDBActive ? dto.carouselMeterDBActive : null,
            applicationsActive: dto.applicationsActive ? dto.applicationsActive : null,
            seriesActive: dto.seriesActive ? dto.seriesActive : null,
            getInTouchActive: dto.getInTouchActive ? dto.getInTouchActive : null,
            linkedInLink: dto.linkedInLink ? dto.linkedInLink : null,
            youtubeLink: dto.youtubeLink ? dto.youtubeLink : null,
            facebookLink: dto.facebookLink ? dto.facebookLink : null,
            twitterLink: dto.twitterLink ? dto.twitterLink : null,
            instagramLink: dto.instagramLink ? dto.instagramLink : null,
            aboutContent: dto.aboutContent ? dto.aboutContent : null,
            aboutTimeline: dto.aboutTimeline ? dto.aboutTimeline : null,
            aboutPatent: dto.aboutPatent ? dto.aboutPatent : null,
            serverEmailHost: dto.serverEmailHost ? dto.serverEmailHost : null,
            serverEmailPort: dto.serverEmailPort ? dto.serverEmailPort : null,
            serverEmailSecure: dto.serverEmailSecure ? dto.serverEmailSecure : null,
            serverEmailAccount: dto.serverEmailAccount ? dto.serverEmailAccount : null,
            serverEmailPassword: dto.serverEmailPassword ? dto.serverEmailPassword : null,
            created_at: dto.created_at ? dto.created_at : date,
            updated_at: dto.updated_at ? dto.updated_at : date,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,

        }
    }
    public static emptyDto(): OrgWebsiteDto {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            companyName: null,
            companyEmail: null,
            companyPhone: null,
            companyHours: null,
            companyAddress: null,
            carouselHeadActive: true,
            carouselHeadText: null,
            carouselFootActive: true,
            carouselFootText: null,
            carouselBenefitsActive: true,
            carouselAnimationActive: true,
            carouselAnimationLink: null,
            carouselMeterDBActive: true,
            applicationsActive: true,
            seriesActive: true,
            getInTouchActive: true,
            linkedInLink: null,
            youtubeLink: null,
            facebookLink: null,
            twitterLink: null,
            instagramLink: null,
            aboutContent: null,
            aboutTimeline: null,
            aboutPatent: null,
            serverEmailHost: null,
            serverEmailPort: null,
            serverEmailSecure: true,
            serverEmailAccount: null,
            serverEmailPassword: null,
            created_at: date,
            updated_at: null,
            deleted_at: null,
        }
    }

    public static primaryDefaultDto(): OrgWebsiteDto {
        const datetime = new Date().toISOString();
        return {
            id: 'susiadaptors.com',
            companyName: 'SUSI Adapters',
            companyEmail: 'sales@susiadapters.com',
            companyPhone: 'https://susiadapters.com',
            companyHours: 'Mon - Fri: 8am - 5pm',
            companyAddress: '3020 Business Park Drive Suite E Norcross, Georgia, 30071',
            carouselHeadActive: true,
            carouselHeadText: 'Leader in Meter Installation Solutions',
            carouselFootActive: true,
            carouselFootText: 'Cost Effective Solutions for Upgrading or New Installations',
            carouselBenefitsActive: true,
            carouselAnimationActive: true,
            carouselAnimationLink: 'https://www.youtube.com/watch?v=2Zt8va7jK2I',
            carouselMeterDBActive: true,
            applicationsActive: true,
            seriesActive: true,
            getInTouchActive: true,
            linkedInLink: 'https://www.linkedin.com/company/susiadapters/',
            youtubeLink: 'https://www.youtube.com/channel/UCGGMUcRPnbYjpuLidz7L4Eg',
            facebookLink: 'https://www.facebook.com/susiadapters/',
            twitterLink: 'https://twitter.com/SUSI_Adapters',
            instagramLink: '',
            aboutContent: '',
            aboutTimeline: '',
            aboutPatent: '',
            serverEmailHost: 'smtp.gmail.com',
            serverEmailPort: 465,
            serverEmailSecure: true,
            serverEmailAccount: '',
            serverEmailPassword: '',
            created_at: datetime,
            updated_at: datetime,
            deleted_at: null,
        }
    }

}

export interface OrgWebsiteDto {
    id: string;
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    companyHours: string;
    companyAddress: string;
    carouselHeadActive: boolean;
    carouselHeadText: string;
    carouselFootActive: boolean;
    carouselFootText: string;
    carouselBenefitsActive: boolean;
    carouselAnimationActive: boolean;
    carouselAnimationLink: string;
    carouselMeterDBActive: boolean;
    applicationsActive: boolean;
    seriesActive: boolean;
    getInTouchActive: boolean;
    linkedInLink: string;
    youtubeLink: string;
    facebookLink: string;
    twitterLink: string;
    instagramLink: string;
    aboutContent: string;
    aboutTimeline: string;
    aboutPatent: string;
    serverEmailHost: string;
    serverEmailPort: number;
    serverEmailSecure: boolean;
    serverEmailAccount: string;
    serverEmailPassword: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
