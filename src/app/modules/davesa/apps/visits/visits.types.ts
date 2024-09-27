import { CountryStateCity } from "app/core/interfaces/country-state-city.interface";

export interface Irb {
  id: number;
  oid: string;
  name: string;
  website: string;
  email: string;
  street_1: string;
  street_2: string;
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
  country_code?: number;
  type?: string;
  zip?: string;
  created_by?: number;
  updated_by?: number;
  stateName?: string;
  countryName?: string;
  cityName?: string;
  created_at?: Date;
}
