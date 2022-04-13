import { countriesEnum } from "../entitiesTypes/entitiesType";
import { jetTypesEnum } from "./jetTypes/jetTypes";
import { yachtTypesEnum } from "./yachtTypes";

export enum vehiclesCategoriesEnum {
  yacht = 1, // TODO enum
  jet = 2,
}

interface basicVehiclePreviewType {
  id: number;
  name: string;
  photo: string;
  countryName: string;
  country: countriesEnum;
  year: number;
  people: number;
  toilets: number;
  length: number;
  width: number;
  price?: number;
  discount?: number;
  isNew?: boolean;
  additionalFeatures?: Array<string>;
  is_draft?: boolean;
}

export interface yachtPreviewType extends basicVehiclePreviewType {
  marinaCoordinates: string;
  marinaName: string;
  type: yachtTypesEnum;
  cabins: number;
  showers: number;
}

export interface jetPreviewType extends basicVehiclePreviewType {
  airportCoordinates: string;
  airportName: string;
  type: jetTypesEnum;
  height: number;
  speed: number;
  range: number;
  baggage: number;
}

export interface vehicleCardPreviewProps {
  date?: string;
  manager?: string;
  className?: string;
  onEdit: (id: number) => void;
  //onReplaceToDrafts?: (id: number) => void;
  //onDelete: (id: number) => void;
  //onPublish?: (id: number) => void;
  onDecreaseOffset?: () => void;
}
