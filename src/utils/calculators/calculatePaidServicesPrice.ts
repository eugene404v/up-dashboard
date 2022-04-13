import { unitTypesEnum } from "types/entitiesTypes/unitTypes";
import { extraExpenseType } from "types/vehicleTypes/cardTypes";

export const calculatePaidServicesPrice = (allServices: extraExpenseType[], selectedIds: Array<string|number>, days: number = 1, people: number = 1) => {
    if (!allServices) return 0
    const ids = selectedIds.map(el => Number(el))
    return allServices.filter(el => ids.includes(el.id||0)).map(el => {
        switch (el.unit) {
            case unitTypesEnum.perDay:
                return el.price * days;
            case unitTypesEnum.perPerson:
                return el.price * people;
            case unitTypesEnum.perWeek:
                return el.price * Math.ceil(days/7)
            default:
                return el.price
        }
    }).reduce((prev, current) => prev + current, 0)
}   