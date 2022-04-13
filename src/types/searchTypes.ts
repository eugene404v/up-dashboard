import { vehiclesCategoriesEnum } from "./vehicleTypes/vehiclesTypes";

export interface basicFilterType {
    categorie: vehiclesCategoriesEnum;
    regions: number[]; // TODO
}

export interface cardsFilterType extends basicFilterType {
    search: string;
}

 