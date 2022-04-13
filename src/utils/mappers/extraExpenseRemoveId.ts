import { extraExpenseType } from "types/vehicleTypes/cardTypes";

export const extraExpenseRemoveIds = (items: extraExpenseType[]):extraExpenseType[] => {
    return items.map(el => ({
        name: el.name,
        price: el.price,
        unit: el.unit
    }))
}