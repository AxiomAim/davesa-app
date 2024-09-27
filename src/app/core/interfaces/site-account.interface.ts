import { CountryStateCity } from "app/core/interfaces/country-state-city.interface";
import { SiteAccountCredential } from "./site-account-credential.interface";
import { SiteAccountTraining } from "./site-account-training.interface";
import { site_account_bank_detail } from "./study.interface";

export interface SiteAccount {
  id: number;
  oid: string;
  site_name: string;
  website_url: string;
  prefix_title: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  phone_phone: string;
  country_name: string;
  address: string;
  state_id: number;
  country_id: number;
  city_id: number;
  state: CountryStateCity;
  country: CountryStateCity;
  city: CountryStateCity;
  gender: string;
  is_active: boolean;
  logo: string;
  credentials: SiteAccountCredential[];
  trainings: SiteAccountTraining[];
  site_account_bank_details?: site_account_bank_detail[];
  prefixTitle?: PrefixTitle[];
  country_code?: number;
  fax?: string;
  zip?: number;
  created_by?: number;
  updated_by?: number;
  isDeleted?: boolean;
  stateName?: string;
}

interface PrefixTitle {
  id: number;
  prefix: string;
}

export interface SiteAccountCreateEdit {
  site_name: string;
  website_url: string | null;
  prefix_title: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  fax: string | null;
  phone_number: string | null;
  country_id: number | null;
  address: string;
  state_id: number;
  city_id: number;
  zip: string;
  is_active: boolean;
  country_code: number;
  logo?: string | null;
}

export interface UploadLogoPayload {
  site_account_oid: string;
  logo: Blob; // For file uploads
}
