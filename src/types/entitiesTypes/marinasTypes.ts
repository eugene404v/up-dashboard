import { selectDataType } from "types/utilTypes";

export interface marinaType {
    about: string;
    address: string;
    city?: number | null;
    locationLat: number | null;
    locationLon: number | null;
    locationNote: string;
    name: string;
}

export interface marinaTypeWithId extends marinaType {
    id: number;
}

export interface marinaTypeForDisplay extends Omit<marinaTypeWithId, "city"> {
    country: selectDataType;
    city: selectDataType;
}