import { cabinStypesEnum } from "types/entitiesTypes/cabinsType"

export type cabinsObj = {
    [key: string]: number;
}

export const bedCountCalculator = (obj: cabinsObj) => {
    if (!obj) return 0
    let counter = 0
    counter = counter + (obj[cabinStypesEnum.single] || 0);
    counter = counter + (2*obj[cabinStypesEnum.double] || 0);
    counter = counter + (3*obj[cabinStypesEnum.three] || 0);
    counter = counter + (4*obj[cabinStypesEnum.four] || 0);
    counter = counter + (1*obj[cabinStypesEnum.saloon] || 0);
    return counter
}