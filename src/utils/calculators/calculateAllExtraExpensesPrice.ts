import { unitTypesEnum } from "types/entitiesTypes/unitTypes";
import { extraExpenseType } from "types/vehicleTypes/cardTypes";

export const calculateAllExtraExpensesPrice = (expenses: extraExpenseType[], days: number = 1, people: number = 1) => {
    if (!expenses) return 0
    return expenses.map(el => {
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