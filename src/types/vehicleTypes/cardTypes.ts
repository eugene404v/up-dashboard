import { amenitiesJetType, amenitiesJetTypeEnum, amenitiesYachtType, amenitiesYachtTypeEnum, amenityType } from "types/entitiesTypes/amenitiesTypes";
import { marinaTypeForDisplay, marinaTypeWithId } from "types/entitiesTypes/marinasTypes";
import { paymentTermTypesEnum } from "types/entitiesTypes/paymentTermTypes";
import { unitTypesEnum } from "types/entitiesTypes/unitTypes";
import { photoType } from "types/photoTypes";
import { selectDataType } from "types/utilTypes";
import { objWithIdsArrays } from "utils/mappers/fromObjWithIdToArr";
import { jetTypesEnum } from "./jetTypes/jetTypes";
import { mainSailTypesEnum } from "./mainSailTypes";
import { skipperLicenseTypesEnum } from "./skipperLicenseTypes";
import { yachtTypesEnum } from "./yachtTypes";

export interface yachtFullCardForm {
    name: string;
    manufacturer?: number;
    marina?: number;
    owner?: string;
    cost?: number;
    discount?: number;
    paymentTerm?: paymentTermTypesEnum;
    skipperLicenseType?: skipperLicenseTypesEnum;
    additional_conditions?: number[];
    year_built?: number;
    beam?: number;
    passengerCount?: number;
    length?: number;
    toiletCount?: number;
    showerCount?: number;
    draught?: number;
    about?: string;
    mainsailType?: mainSailTypesEnum;
    engineHP?: number;
    fuelTankVolume?: number;
    waterTankVolume?: number;
    cabins?: {
        SI?: number;
        DB?: number;
        TB?: number;
        FB?: number;
        SB?: number;
        CB?: number;
    };
    extra_expenses: extraExpenseType[];
    paid_services: extraExpenseType[];
    price?: number
}

export interface yachtFullCardFormWithType extends yachtFullCardForm {
    type: yachtTypesEnum;
    amenities?: number[];
}

export interface extraExpenseType<U=unitTypesEnum> {
    name: string;
    price: number;
    unit: U;
    id?: number
}

export type yachtAmenitiesType = {
    [amenitiesYachtTypeEnum.entertainment]: amenitiesYachtType[];
    [amenitiesYachtTypeEnum.equipment]: amenitiesYachtType[];
    [amenitiesYachtTypeEnum.saloonAndCabins]: amenitiesYachtType[];
}

export type jetAmenitiesType = {
    [amenitiesJetTypeEnum.comfort]: amenitiesJetType[];
    [amenitiesJetTypeEnum.equipment]: amenitiesJetType[];
}

export interface yachtFullCard extends yachtFullCardForm {
    type: yachtTypesEnum;
    amenities?: number[];
    bedCount?: number;
}

export interface yachtInfoForUpdate {
    id: number;
    yachtInfo: yachtFullCard;
}

export interface yachtFullCardForDisplay extends Omit<yachtFullCardForm, "marina"|"manufacturer"|"additional_conditions"> {
    amenities: amenityType[];
    bedCount?: number;
    type: yachtTypesEnum;
    marina: marinaTypeForDisplay;
    is_draft: boolean;
    manufacturer: selectDataType;
    additional_conditions: selectDataType[];
    id: number;
    photos?: photoType[];
    main_photo?: photoType;
}

export interface yachtFullCardForEdit extends Omit<yachtFullCardForDisplay, "marina"|"manufacturer"|"additional_conditions"|"amenities"|"main_photo"> {
    marina: number,
    manufacturer: number,
    additional_conditions: number[],
    amenities: number[],
    main_photo?: number
}

export interface jetFullCardForm {
    airport?: number;
    width?: number;
    height?: number;
    bedCount?: number;
    baggageVolume?: number;
    range?: number;
    speed?: number; 
    name: string;
    manufacturer?: number;
    owner?: string;
    cost?: number;
    discount?: number;
    paymentTerm?: paymentTermTypesEnum;
    additional_conditions?: number[];
    year_built?: number;
    passengerCount?: number;
    length?: number;
    toiletCount?: number;
    about?: string;
    engineHP?: number;
    fuelTankVolume?: number;
    waterTankVolume?: number;
    extra_expenses: extraExpenseType[];
    paid_services: extraExpenseType[];
}

export interface jetFullCard extends jetFullCardForm {
   type: jetTypesEnum;
   amenities: number[];
}

export interface jetFullCardFormWithType extends jetFullCardForm {
    type: jetTypesEnum;
    amenities?: number[];
}

export interface jetInfoForUpdate {
    id: number;
    jetInfo: jetFullCard;
}

export interface jetFullCardForDisplay extends Omit<jetFullCardForm, "airport"|"manufacturer"|"additional_conditions"> {
    amenities: amenityType[];
    type: jetTypesEnum;
    airport: marinaTypeForDisplay;
    is_draft: boolean;
    manufacturer: selectDataType;
    additional_conditions: selectDataType[];
    id: number;
    photos?: photoType[]
}

export interface jetFullCardForEdit extends Omit<jetFullCardForDisplay, "airport"|"manufacturer"|"additional_conditions"|"amenities"> {
    airport: number,
    manufacturer: number,
    additional_conditions: number[],
    amenities: number[],
    main_photo?: number;
}