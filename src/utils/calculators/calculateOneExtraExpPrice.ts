import { unitTypesEnum } from "types/entitiesTypes/unitTypes"

type oneExtraExpense = {
    price: number;
    unit: unitTypesEnum;
    days?: number;
    people?: number
}

export const calculateOneExtraExpPrice = ({price, people = 1, days = 1, unit}:oneExtraExpense) => {
    switch (unit) {
        case unitTypesEnum.perDay:
            return price * days;
        case unitTypesEnum.perPerson:
            return price * people;
        case unitTypesEnum.perWeek:
            return price * Math.ceil(days/7)
        default:
            return price
    }
}