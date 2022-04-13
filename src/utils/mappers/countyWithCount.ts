import { countriesWithBothCounters, vehiclesByCountry } from "types/entitiesTypes/entitiesType";
import { vehiclesCategoriesEnum } from "types/vehicleTypes/vehiclesTypes";

export const countryWithCount = (countries: countriesWithBothCounters[], categorie: vehiclesCategoriesEnum):vehiclesByCountry[] => {
    if (!countries) return []
    if (categorie === vehiclesCategoriesEnum.yacht) {
        return countries.map(el => ({
            ...el,
            counter: el.yachts_count as number,
            id: el.id as number
        }))
    } else {
        return countries.map(el => ({
            ...el,
            counter: el.jets_count as number,
            id: el.id as number
        }))
    }
}