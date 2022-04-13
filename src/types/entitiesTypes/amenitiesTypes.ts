import { selectDataType } from "types/utilTypes";

export enum amenitiesJetTypeEnum {
    equipment = "EQ",
    comfort = "CO"
}

export enum amenitiesYachtTypeEnum {
    equipment = "EQ",
    saloonAndCabins = "SC",
    entertainment = "ET"
}

export interface amenitiesYachtType extends selectDataType {
    type: amenitiesYachtTypeEnum;
}

export interface amenitiesJetType extends selectDataType {
    type: amenitiesJetTypeEnum;
}

export type amenityType = {
    name: string;
    id: number;
    type: amenitiesYachtTypeEnum | amenitiesJetTypeEnum;
}